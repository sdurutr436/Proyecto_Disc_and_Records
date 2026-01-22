/**
 * Tests de Verificación Cross-Browser
 * =====================================
 * 
 * Este archivo contiene tests específicos para verificar la compatibilidad
 * del navegador con las funcionalidades críticas de la aplicación.
 * 
 * Navegadores objetivo (según .browserslistrc):
 * - Chrome (últimas 2 versiones)
 * - Firefox (últimas 2 versiones)  
 * - Safari (últimas 2 versiones)
 * - Edge (últimas 2 versiones)
 * - iOS Safari (últimas 2 versiones)
 * - Chrome Android (últimas 2 versiones)
 * 
 * Ejecución:
 * - Chrome:  ng test --browsers=Chrome
 * - Firefox: ng test --browsers=Firefox
 * - Headless: ng test --browsers=ChromeHeadless,FirefoxHeadless
 */

import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component, signal, computed, effect, inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of, firstValueFrom } from 'rxjs';
import { map, delay } from 'rxjs/operators';

// ============================================================================
// HELPERS DE DETECCIÓN DE NAVEGADOR
// ============================================================================

interface BrowserInfo {
  name: string;
  version: string;
  engine: string;
  isChromium: boolean;
  isFirefox: boolean;
  isSafari: boolean;
  isEdge: boolean;
  isMobile: boolean;
  supportsES2022: boolean;
  supportsWebComponents: boolean;
  supportsCSS: {
    grid: boolean;
    flexbox: boolean;
    customProperties: boolean;
    containerQueries: boolean;
  };
}

function detectBrowser(): BrowserInfo {
  const ua = navigator.userAgent;
  const vendor = navigator.vendor || '';
  
  const isChromium = /Chrome/.test(ua) && /Google Inc/.test(vendor);
  const isFirefox = /Firefox/.test(ua);
  const isSafari = /Safari/.test(ua) && !/Chrome/.test(ua);
  const isEdge = /Edg/.test(ua);
  const isMobile = /Mobile|Android|iPhone|iPad/.test(ua);
  
  let name = 'Unknown';
  let version = 'Unknown';
  let engine = 'Unknown';
  
  if (isEdge) {
    name = 'Edge';
    version = ua.match(/Edg\/(\d+)/)?.[1] || 'Unknown';
    engine = 'Chromium';
  } else if (isChromium) {
    name = 'Chrome';
    version = ua.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
    engine = 'Chromium';
  } else if (isFirefox) {
    name = 'Firefox';
    version = ua.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
    engine = 'Gecko';
  } else if (isSafari) {
    name = 'Safari';
    version = ua.match(/Version\/(\d+)/)?.[1] || 'Unknown';
    engine = 'WebKit';
  }
  
  return {
    name,
    version,
    engine,
    isChromium: isChromium || isEdge,
    isFirefox,
    isSafari,
    isEdge,
    isMobile,
    supportsES2022: checkES2022Support(),
    supportsWebComponents: checkWebComponentsSupport(),
    supportsCSS: checkCSSSupport()
  };
}

function checkES2022Support(): boolean {
  try {
    // Verificar características ES2022+
    // 1. Array.at()
    const arr = [1, 2, 3];
    if (arr.at?.(-1) !== 3) return false;
    
    // 2. Object.hasOwn()
    if (!Object.hasOwn({ a: 1 }, 'a')) return false;
    
    // 3. String.replaceAll()
    if ('aaa'.replaceAll('a', 'b') !== 'bbb') return false;
    
    // 4. Promise.any (ES2021)
    if (typeof Promise.any !== 'function') return false;
    
    // 5. WeakRef (ES2021)
    if (typeof WeakRef !== 'function') return false;
    
    // 6. Logical assignment operators
    let x = null;
    x ??= 5;
    if (x !== 5) return false;
    
    return true;
  } catch {
    return false;
  }
}

function checkWebComponentsSupport(): boolean {
  return (
    'customElements' in window &&
    'attachShadow' in Element.prototype &&
    'getRootNode' in Element.prototype
  );
}

function checkCSSSupport(): BrowserInfo['supportsCSS'] {
  const testEl = document.createElement('div');
  
  return {
    grid: CSS.supports?.('display', 'grid') ?? 
          (testEl.style.display = 'grid', testEl.style.display === 'grid'),
    flexbox: CSS.supports?.('display', 'flex') ?? 
             (testEl.style.display = 'flex', testEl.style.display === 'flex'),
    customProperties: CSS.supports?.('--test', '1') ?? 
                      window.CSS !== undefined,
    containerQueries: CSS.supports?.('container-type', 'inline-size') ?? false
  };
}

// ============================================================================
// COMPONENTES DE PRUEBA
// ============================================================================

@Component({
  selector: 'test-signals',
  standalone: true,
  template: `
    <div class="signal-test">
      <span class="count">{{ count() }}</span>
      <span class="doubled">{{ doubled() }}</span>
      <button (click)="increment()">+</button>
    </div>
  `
})
class TestSignalsComponent {
  count = signal(0);
  doubled = computed(() => this.count() * 2);
  
  constructor() {
    // Effect para tracking
    effect(() => {
      console.log(`[Signal Effect] Count changed: ${this.count()}`);
    });
  }
  
  increment(): void {
    this.count.update(c => c + 1);
  }
}

@Component({
  selector: 'test-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="form" class="test-form">
      <input formControlName="email" type="email" />
      <input formControlName="password" type="password" />
      <div class="errors" *ngIf="form.get('email')?.errors">
        <span *ngIf="form.get('email')?.errors?.['required']">Email required</span>
        <span *ngIf="form.get('email')?.errors?.['email']">Invalid email</span>
      </div>
    </form>
  `
})
class TestReactiveFormComponent {
  private fb = inject(FormBuilder);
  
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
}

@Injectable({ providedIn: 'root' })
class TestAsyncService {
  private data$ = new BehaviorSubject<string[]>([]);
  
  getData(): Observable<string[]> {
    return this.data$.asObservable();
  }
  
  fetchData(): Observable<string[]> {
    return of(['item1', 'item2', 'item3']).pipe(
      delay(100),
      map(items => {
        this.data$.next(items);
        return items;
      })
    );
  }
}

// ============================================================================
// TESTS CROSS-BROWSER
// ============================================================================

describe('Cross-Browser Compatibility Tests', () => {
  let browserInfo: BrowserInfo;
  
  beforeAll(() => {
    browserInfo = detectBrowser();
    console.log('='.repeat(60));
    console.log('BROWSER DETECTION RESULTS');
    console.log('='.repeat(60));
    console.log(`Browser: ${browserInfo.name} v${browserInfo.version}`);
    console.log(`Engine: ${browserInfo.engine}`);
    console.log(`Mobile: ${browserInfo.isMobile}`);
    console.log(`ES2022 Support: ${browserInfo.supportsES2022}`);
    console.log(`Web Components: ${browserInfo.supportsWebComponents}`);
    console.log(`CSS Grid: ${browserInfo.supportsCSS.grid}`);
    console.log(`CSS Flexbox: ${browserInfo.supportsCSS.flexbox}`);
    console.log(`CSS Custom Properties: ${browserInfo.supportsCSS.customProperties}`);
    console.log(`CSS Container Queries: ${browserInfo.supportsCSS.containerQueries}`);
    console.log('='.repeat(60));
  });

  describe('1. JavaScript ES2022+ Features', () => {
    it('debería soportar Array.at()', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(arr.at?.(0)).toBe(1);
      expect(arr.at?.(-1)).toBe(5);
      expect(arr.at?.(-2)).toBe(4);
    });

    it('debería soportar Object.hasOwn()', () => {
      const obj = { name: 'test', value: 42 };
      expect(Object.hasOwn(obj, 'name')).toBeTrue();
      expect(Object.hasOwn(obj, 'missing')).toBeFalse();
    });

    it('debería soportar String.replaceAll()', () => {
      const str = 'hello-world-test';
      expect(str.replaceAll('-', '_')).toBe('hello_world_test');
    });

    it('debería soportar operadores de asignación lógica (??=, ||=, &&=)', () => {
      let a: number | null = null;
      a ??= 10;
      expect(a).toBe(10);
      
      let b = 0;
      b ||= 20;
      expect(b).toBe(20);
      
      let c = 5;
      c &&= 30;
      expect(c).toBe(30);
    });

    it('debería soportar Optional Chaining (?.) y Nullish Coalescing (??)', () => {
      const obj: { nested?: { value?: number } } = {};
      expect(obj?.nested?.value ?? 'default').toBe('default');
      
      const obj2 = { nested: { value: 42 } };
      expect(obj2?.nested?.value ?? 'default').toBe(42);
    });

    it('debería soportar Promise.allSettled()', async () => {
      const results = await Promise.allSettled([
        Promise.resolve('success'),
        Promise.reject('error')
      ]);
      
      expect(results.length).toBe(2);
      expect(results[0].status).toBe('fulfilled');
      expect(results[1].status).toBe('rejected');
    });

    it('debería soportar Promise.any()', async () => {
      const result = await Promise.any([
        Promise.reject('error1'),
        Promise.resolve('success'),
        Promise.reject('error2')
      ]);
      
      expect(result).toBe('success');
    });

    it('debería soportar WeakRef y FinalizationRegistry', () => {
      expect(typeof WeakRef).toBe('function');
      expect(typeof FinalizationRegistry).toBe('function');
      
      const obj = { data: 'test' };
      const weakRef = new WeakRef(obj);
      expect(weakRef.deref()?.data).toBe('test');
    });
  });

  describe('2. Angular Signals (v16+)', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestSignalsComponent]
      }).compileComponents();
    });

    it('debería crear signals reactivos', () => {
      const count = signal(0);
      expect(count()).toBe(0);
      
      count.set(5);
      expect(count()).toBe(5);
      
      count.update(c => c + 1);
      expect(count()).toBe(6);
    });

    it('debería crear computed signals', () => {
      const base = signal(10);
      const doubled = computed(() => base() * 2);
      const tripled = computed(() => base() * 3);
      
      expect(doubled()).toBe(20);
      expect(tripled()).toBe(30);
      
      base.set(5);
      expect(doubled()).toBe(10);
      expect(tripled()).toBe(15);
    });

    it('debería renderizar componente con signals', () => {
      const fixture = TestBed.createComponent(TestSignalsComponent);
      fixture.detectChanges();
      
      const countSpan = fixture.nativeElement.querySelector('.count');
      const doubledSpan = fixture.nativeElement.querySelector('.doubled');
      
      expect(countSpan.textContent).toBe('0');
      expect(doubledSpan.textContent).toBe('0');
      
      fixture.componentInstance.increment();
      fixture.detectChanges();
      
      expect(countSpan.textContent).toBe('1');
      expect(doubledSpan.textContent).toBe('2');
    });
  });

  describe('3. Reactive Forms', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestReactiveFormComponent]
      }).compileComponents();
    });

    it('debería crear formulario reactivo', () => {
      const fixture = TestBed.createComponent(TestReactiveFormComponent);
      fixture.detectChanges();
      
      const form = fixture.componentInstance.form;
      expect(form).toBeTruthy();
      expect(form.get('email')).toBeTruthy();
      expect(form.get('password')).toBeTruthy();
    });

    it('debería validar campos requeridos', () => {
      const fixture = TestBed.createComponent(TestReactiveFormComponent);
      fixture.detectChanges();
      
      const form = fixture.componentInstance.form;
      expect(form.valid).toBeFalse();
      expect(form.get('email')?.errors?.['required']).toBeTrue();
    });

    it('debería validar formato de email', () => {
      const fixture = TestBed.createComponent(TestReactiveFormComponent);
      fixture.detectChanges();
      
      const form = fixture.componentInstance.form;
      form.get('email')?.setValue('invalid');
      
      expect(form.get('email')?.errors?.['email']).toBeTrue();
      
      form.get('email')?.setValue('valid@example.com');
      expect(form.get('email')?.errors).toBeNull();
    });

    it('debería actualizar vista al cambiar valores', () => {
      const fixture = TestBed.createComponent(TestReactiveFormComponent);
      fixture.detectChanges();
      
      const emailInput: HTMLInputElement = fixture.nativeElement.querySelector('input[formControlName="email"]');
      
      emailInput.value = 'test@example.com';
      emailInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      
      expect(fixture.componentInstance.form.get('email')?.value).toBe('test@example.com');
    });
  });

  describe('4. RxJS Observables', () => {
    let service: TestAsyncService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [TestAsyncService]
      });
      service = TestBed.inject(TestAsyncService);
    });

    it('debería crear BehaviorSubject', () => {
      const data$ = service.getData();
      expect(data$).toBeTruthy();
    });

    it('debería emitir datos con delay', fakeAsync(() => {
      let result: string[] = [];
      
      service.fetchData().subscribe(data => {
        result = data;
      });
      
      expect(result.length).toBe(0);
      
      tick(100);
      
      expect(result.length).toBe(3);
      expect(result).toEqual(['item1', 'item2', 'item3']);
    }));

    it('debería soportar firstValueFrom', async () => {
      const data$ = of(['a', 'b', 'c']);
      const result = await firstValueFrom(data$);
      
      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('debería soportar operadores de transformación', fakeAsync(() => {
      let result: number[] = [];
      
      of([1, 2, 3]).pipe(
        delay(50),
        map(arr => arr.map(n => n * 2))
      ).subscribe(data => {
        result = data;
      });
      
      tick(50);
      
      expect(result).toEqual([2, 4, 6]);
    }));
  });

  describe('5. CSS Feature Detection', () => {
    it('debería soportar CSS Grid', () => {
      const div = document.createElement('div');
      div.style.display = 'grid';
      expect(div.style.display).toBe('grid');
    });

    it('debería soportar CSS Flexbox', () => {
      const div = document.createElement('div');
      div.style.display = 'flex';
      expect(div.style.display).toBe('flex');
    });

    it('debería soportar CSS Custom Properties (variables)', () => {
      const div = document.createElement('div');
      div.style.setProperty('--test-color', '#ff0000');
      expect(div.style.getPropertyValue('--test-color')).toBe('#ff0000');
    });

    it('debería soportar CSS calc()', () => {
      const div = document.createElement('div');
      div.style.width = 'calc(100% - 20px)';
      expect(div.style.width).toContain('calc');
    });

    it('debería soportar CSS clamp() (opcional, moderno)', () => {
      // clamp() es más moderno, puede no estar en todos los navegadores
      const supportsClamp = CSS.supports?.('width', 'clamp(10px, 50%, 100px)') ?? false;
      console.log(`CSS clamp() support: ${supportsClamp}`);
      // No fallamos si no está soportado, solo lo registramos
      expect(true).toBeTrue();
    });
  });

  describe('6. Web APIs', () => {
    it('debería soportar Fetch API', () => {
      expect(typeof fetch).toBe('function');
    });

    it('debería soportar LocalStorage', () => {
      expect(typeof localStorage).toBe('object');
      
      localStorage.setItem('test-key', 'test-value');
      expect(localStorage.getItem('test-key')).toBe('test-value');
      localStorage.removeItem('test-key');
    });

    it('debería soportar SessionStorage', () => {
      expect(typeof sessionStorage).toBe('object');
      
      sessionStorage.setItem('test-key', 'test-value');
      expect(sessionStorage.getItem('test-key')).toBe('test-value');
      sessionStorage.removeItem('test-key');
    });

    it('debería soportar URL API', () => {
      const url = new URL('https://example.com/path?query=value');
      expect(url.hostname).toBe('example.com');
      expect(url.pathname).toBe('/path');
      expect(url.searchParams.get('query')).toBe('value');
    });

    it('debería soportar URLSearchParams', () => {
      const params = new URLSearchParams('a=1&b=2');
      expect(params.get('a')).toBe('1');
      expect(params.get('b')).toBe('2');
    });

    it('debería soportar ResizeObserver', () => {
      expect(typeof ResizeObserver).toBe('function');
    });

    it('debería soportar IntersectionObserver', () => {
      expect(typeof IntersectionObserver).toBe('function');
    });

    it('debería soportar MutationObserver', () => {
      expect(typeof MutationObserver).toBe('function');
    });

    it('debería soportar requestAnimationFrame', () => {
      expect(typeof requestAnimationFrame).toBe('function');
    });
  });

  describe('7. DOM APIs modernas', () => {
    it('debería soportar element.closest()', () => {
      const container = document.createElement('div');
      container.className = 'parent';
      const child = document.createElement('span');
      container.appendChild(child);
      document.body.appendChild(container);
      
      expect(child.closest('.parent')).toBe(container);
      
      document.body.removeChild(container);
    });

    it('debería soportar element.matches()', () => {
      const div = document.createElement('div');
      div.className = 'test-class';
      
      expect(div.matches('.test-class')).toBeTrue();
      expect(div.matches('.other-class')).toBeFalse();
    });

    it('debería soportar element.classList', () => {
      const div = document.createElement('div');
      
      div.classList.add('class1', 'class2');
      expect(div.classList.contains('class1')).toBeTrue();
      expect(div.classList.contains('class2')).toBeTrue();
      
      div.classList.remove('class1');
      expect(div.classList.contains('class1')).toBeFalse();
      
      div.classList.toggle('class3');
      expect(div.classList.contains('class3')).toBeTrue();
    });

    it('debería soportar element.dataset', () => {
      const div = document.createElement('div');
      div.dataset['testValue'] = 'hello';
      
      expect(div.dataset['testValue']).toBe('hello');
      expect(div.getAttribute('data-test-value')).toBe('hello');
    });

    it('debería soportar element.append() y prepend()', () => {
      const parent = document.createElement('div');
      const child1 = document.createElement('span');
      const child2 = document.createElement('span');
      
      parent.append(child1);
      parent.prepend(child2);
      
      expect(parent.firstChild).toBe(child2);
      expect(parent.lastChild).toBe(child1);
    });

    it('debería soportar element.remove()', () => {
      const parent = document.createElement('div');
      const child = document.createElement('span');
      parent.appendChild(child);
      
      child.remove();
      
      expect(parent.children.length).toBe(0);
    });
  });

  describe('8. Event Handling', () => {
    it('debería soportar CustomEvent', () => {
      const detail = { message: 'test', value: 42 };
      const event = new CustomEvent('custom-event', { detail });
      
      expect(event.detail).toEqual(detail);
      expect(event.type).toBe('custom-event');
    });

    it('debería soportar dispatchEvent', () => {
      const div = document.createElement('div');
      let received = false;
      
      div.addEventListener('test-event', () => {
        received = true;
      });
      
      div.dispatchEvent(new Event('test-event'));
      
      expect(received).toBeTrue();
    });

    it('debería soportar addEventListener con options', () => {
      const div = document.createElement('div');
      let count = 0;
      
      div.addEventListener('click', () => count++, { once: true });
      
      div.click();
      div.click();
      
      expect(count).toBe(1);
    });

    it('debería soportar passive event listeners', () => {
      let passiveSupported = false;
      
      try {
        const options = {
          get passive() {
            passiveSupported = true;
            return false;
          }
        };
        
        window.addEventListener('test', () => {}, options as AddEventListenerOptions);
        window.removeEventListener('test', () => {});
      } catch {
        passiveSupported = false;
      }
      
      expect(passiveSupported).toBeTrue();
    });
  });

  describe('9. JSON y Serialización', () => {
    it('debería soportar JSON.parse y stringify', () => {
      const obj = { name: 'test', values: [1, 2, 3] };
      const json = JSON.stringify(obj);
      const parsed = JSON.parse(json);
      
      expect(parsed).toEqual(obj);
    });

    it('debería soportar structuredClone (moderno)', () => {
      // structuredClone es ES2022+
      if (typeof structuredClone === 'function') {
        const obj = { a: 1, b: { c: 2 } };
        const clone = structuredClone(obj);
        
        expect(clone).toEqual(obj);
        expect(clone).not.toBe(obj);
        expect(clone.b).not.toBe(obj.b);
      } else {
        console.warn('structuredClone no soportado en este navegador');
        pending('structuredClone not supported');
      }
    });
  });

  describe('10. Async/Await y Generators', () => {
    it('debería soportar async/await', async () => {
      const asyncFn = async () => {
        return await Promise.resolve('async result');
      };
      
      const result = await asyncFn();
      expect(result).toBe('async result');
    });

    it('debería soportar generators', () => {
      function* numberGenerator() {
        yield 1;
        yield 2;
        yield 3;
      }
      
      const gen = numberGenerator();
      expect(gen.next().value).toBe(1);
      expect(gen.next().value).toBe(2);
      expect(gen.next().value).toBe(3);
      expect(gen.next().done).toBeTrue();
    });

    it('debería soportar async generators', async () => {
      async function* asyncGenerator() {
        yield await Promise.resolve(1);
        yield await Promise.resolve(2);
      }
      
      const results: number[] = [];
      for await (const value of asyncGenerator()) {
        results.push(value);
      }
      
      expect(results).toEqual([1, 2]);
    });
  });

  describe('11. Compatibilidad específica por navegador', () => {
    it('debería reportar información del navegador', () => {
      // Este test siempre pasa pero loguea info útil
      console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    BROWSER COMPATIBILITY REPORT              ║
╠══════════════════════════════════════════════════════════════╣
║ Browser: ${browserInfo.name.padEnd(20)}Version: ${browserInfo.version.padEnd(15)}║
║ Engine: ${browserInfo.engine.padEnd(51)}║
║ Mobile: ${String(browserInfo.isMobile).padEnd(51)}║
╠══════════════════════════════════════════════════════════════╣
║ JAVASCRIPT FEATURES                                          ║
║ ES2022+ Support: ${String(browserInfo.supportsES2022).padEnd(42)}║
║ Web Components: ${String(browserInfo.supportsWebComponents).padEnd(43)}║
╠══════════════════════════════════════════════════════════════╣
║ CSS FEATURES                                                 ║
║ Grid: ${String(browserInfo.supportsCSS.grid).padEnd(53)}║
║ Flexbox: ${String(browserInfo.supportsCSS.flexbox).padEnd(50)}║
║ Custom Properties: ${String(browserInfo.supportsCSS.customProperties).padEnd(40)}║
║ Container Queries: ${String(browserInfo.supportsCSS.containerQueries).padEnd(40)}║
╚══════════════════════════════════════════════════════════════╝
      `);
      
      expect(browserInfo.name).toBeTruthy();
    });

    it('debería verificar características críticas para la app', () => {
      // Verificar que todas las características críticas están soportadas
      const criticalFeatures = {
        'ES2022 Support': browserInfo.supportsES2022,
        'CSS Grid': browserInfo.supportsCSS.grid,
        'CSS Flexbox': browserInfo.supportsCSS.flexbox,
        'CSS Custom Properties': browserInfo.supportsCSS.customProperties,
        'Web Components': browserInfo.supportsWebComponents
      };
      
      let allSupported = true;
      for (const [feature, supported] of Object.entries(criticalFeatures)) {
        if (!supported) {
          console.error(`❌ CRITICAL: ${feature} not supported!`);
          allSupported = false;
        } else {
          console.log(`✅ ${feature}: supported`);
        }
      }
      
      expect(allSupported).toBeTrue();
    });
  });
});
