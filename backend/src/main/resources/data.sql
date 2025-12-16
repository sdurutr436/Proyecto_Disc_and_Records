-- Datos de prueba para Discs & Records

-- ===========================================
-- GÉNEROS MUSICALES (15 géneros)
-- ===========================================
INSERT INTO generos (nombre_genero, descripcion, color) VALUES 
('Rock', 'Rock clásico y moderno, desde los años 50 hasta hoy', '#ED9C05'),
('Pop', 'Música popular comercial', '#CA6703'),
('Jazz', 'Jazz clásico, bebop, cool jazz y fusión', '#BB3F03'),
('Hip-Hop', 'Hip-Hop, rap y trap', '#9D2227'),
('Electronic', 'Música electrónica, EDM, house, techno', '#93CFBB'),
('Classical', 'Música clásica occidental', '#0A9295'),
('Metal', 'Heavy metal, thrash, death, black metal', '#015F72'),
('Indie', 'Música independiente y alternativa', '#01131B'),
('R&B', 'Rhythm and Blues, soul, neo-soul', '#6B4C9A'),
('Reggae', 'Reggae, dub, dancehall', '#2E8B57'),
('Folk', 'Música folk y tradicional', '#8B4513'),
('Punk', 'Punk rock, post-punk, hardcore', '#FF1493'),
('Blues', 'Blues tradicional y contemporáneo', '#4169E1'),
('Country', 'Country, americana, bluegrass', '#DAA520'),
('Latin', 'Música latina, salsa, reggaeton, bachata', '#FF6347');

-- ===========================================
-- ARTISTAS (20 artistas variados)
-- ===========================================
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES 
('Pink Floyd', 4.85),
('The Beatles', 4.90),
('Radiohead', 4.75),
('Kendrick Lamar', 4.70),
('Daft Punk', 4.65),
('Queen', 4.80),
('David Bowie', 4.78),
('Led Zeppelin', 4.82),
('Nirvana', 4.60),
('Miles Davis', 4.88),
('Bob Marley', 4.72),
('Michael Jackson', 4.85),
('Arctic Monkeys', 4.45),
('Tame Impala', 4.50),
('Billie Eilish', 4.35),
('The Weeknd', 4.40),
('Tyler, The Creator', 4.55),
('Frank Ocean', 4.68),
('Beyoncé', 4.62),
('Rosalía', 4.48);

-- ===========================================
-- ÁLBUMES (30 álbumes)
-- ===========================================
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES 
-- Pink Floyd
('The Dark Side of the Moon', 1973, 'https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png', 1, 4.95),
('The Wall', 1979, 'https://upload.wikimedia.org/wikipedia/en/1/13/TheWallCover.jpg', 1, 4.80),
('Wish You Were Here', 1975, 'https://upload.wikimedia.org/wikipedia/en/a/a4/Pink_Floyd%2C_Wish_You_Were_Here_%281975%29.png', 1, 4.85),
-- The Beatles
('Abbey Road', 1969, 'https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg', 2, 4.92),
('Sgt. Peppers Lonely Hearts Club Band', 1967, 'https://upload.wikimedia.org/wikipedia/en/5/50/Sgt._Pepper%27s_Lonely_Hearts_Club_Band.jpg', 2, 4.88),
('Revolver', 1966, 'https://upload.wikimedia.org/wikipedia/en/1/16/Revolver_%28album_cover%29.jpg', 2, 4.75),
-- Radiohead
('OK Computer', 1997, 'https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png', 3, 4.90),
('Kid A', 2000, 'https://upload.wikimedia.org/wikipedia/en/b/b5/Radiohead.kida.albumart.jpg', 3, 4.82),
('In Rainbows', 2007, 'https://upload.wikimedia.org/wikipedia/en/2/2e/In_Rainbows_Official_Cover.jpg', 3, 4.78),
-- Kendrick Lamar
('good kid, m.A.A.d city', 2012, 'https://upload.wikimedia.org/wikipedia/en/3/3c/Good_kid_m.A.A.d_city_deluxe.jpg', 4, 4.88),
('To Pimp a Butterfly', 2015, 'https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png', 4, 4.92),
('DAMN.', 2017, 'https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png', 4, 4.65),
-- Daft Punk
('Discovery', 2001, 'https://upload.wikimedia.org/wikipedia/en/a/ae/Daft_Punk_-_Discovery.jpg', 5, 4.85),
('Random Access Memories', 2013, 'https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg', 5, 4.78),
-- Queen
('A Night at the Opera', 1975, 'https://upload.wikimedia.org/wikipedia/en/4/4d/Queen_A_Night_At_The_Opera.png', 6, 4.88),
('News of the World', 1977, 'https://upload.wikimedia.org/wikipedia/en/e/ea/Queen_News_Of_The_World.png', 6, 4.72),
-- David Bowie
('The Rise and Fall of Ziggy Stardust', 1972, 'https://upload.wikimedia.org/wikipedia/en/0/01/ZiggyStardust.jpg', 7, 4.90),
('Heroes', 1977, 'https://upload.wikimedia.org/wikipedia/en/3/32/David_Bowie_-_%22Heroes%22.jpg', 7, 4.75),
-- Led Zeppelin
('Led Zeppelin IV', 1971, 'https://upload.wikimedia.org/wikipedia/en/2/26/Led_Zeppelin_-_Led_Zeppelin_IV.jpg', 8, 4.95),
('Physical Graffiti', 1975, 'https://upload.wikimedia.org/wikipedia/en/e/e3/Led_Zeppelin_-_Physical_Graffiti.jpg', 8, 4.80),
-- Nirvana
('Nevermind', 1991, 'https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg', 9, 4.85),
('In Utero', 1993, 'https://upload.wikimedia.org/wikipedia/en/e/e5/In_Utero_%28Nirvana%29_album_cover.jpg', 9, 4.68),
-- Miles Davis
('Kind of Blue', 1959, 'https://upload.wikimedia.org/wikipedia/en/9/9c/MilesDavisKindofBlue.jpg', 10, 4.98),
('Bitches Brew', 1970, 'https://upload.wikimedia.org/wikipedia/en/7/7d/Bitches_brew.jpg', 10, 4.72),
-- Bob Marley
('Legend', 1984, 'https://upload.wikimedia.org/wikipedia/en/d/d9/Bob_Marley_-_Legend_album_cover.jpg', 11, 4.80),
-- Michael Jackson
('Thriller', 1982, 'https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png', 12, 4.92),
('Bad', 1987, 'https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png', 12, 4.70),
-- Arctic Monkeys
('AM', 2013, 'https://upload.wikimedia.org/wikipedia/commons/0/0d/AM_%28Arctic_Monkeys%29.jpg', 13, 4.55),
-- Tame Impala
('Currents', 2015, 'https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png', 14, 4.65),
-- Frank Ocean
('Blonde', 2016, 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg', 18, 4.85);

-- ===========================================
-- CANCIONES (50 canciones)
-- ===========================================
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES 
-- Pink Floyd
('Time', 1973, 1, 4.90),
('Money', 1973, 1, 4.75),
('Comfortably Numb', 1979, 1, 4.95),
('Wish You Were Here', 1975, 1, 4.92),
('Shine On You Crazy Diamond', 1975, 1, 4.88),
-- The Beatles
('Come Together', 1969, 2, 4.85),
('Something', 1969, 2, 4.80),
('Here Comes the Sun', 1969, 2, 4.90),
('Let It Be', 1970, 2, 4.88),
('Yesterday', 1965, 2, 4.92),
-- Radiohead
('Paranoid Android', 1997, 3, 4.88),
('No Surprises', 1997, 3, 4.75),
('Karma Police', 1997, 3, 4.82),
('Creep', 1992, 3, 4.60),
('Everything In Its Right Place', 2000, 3, 4.78),
-- Kendrick Lamar
('Swimming Pools', 2012, 4, 4.65),
('Poetic Justice', 2012, 4, 4.58),
('Alright', 2015, 4, 4.88),
('HUMBLE.', 2017, 4, 4.72),
('DNA.', 2017, 4, 4.78),
-- Daft Punk
('One More Time', 2001, 5, 4.85),
('Digital Love', 2001, 5, 4.78),
('Get Lucky', 2013, 5, 4.82),
('Instant Crush', 2013, 5, 4.68),
-- Queen
('Bohemian Rhapsody', 1975, 6, 4.98),
('We Will Rock You', 1977, 6, 4.85),
('We Are the Champions', 1977, 6, 4.82),
('Dont Stop Me Now', 1978, 6, 4.90),
-- David Bowie
('Starman', 1972, 7, 4.85),
('Space Oddity', 1969, 7, 4.88),
('Heroes', 1977, 7, 4.92),
('Life on Mars?', 1971, 7, 4.90),
-- Led Zeppelin
('Stairway to Heaven', 1971, 8, 4.98),
('Whole Lotta Love', 1969, 8, 4.85),
('Kashmir', 1975, 8, 4.90),
('Black Dog', 1971, 8, 4.78),
-- Nirvana
('Smells Like Teen Spirit', 1991, 9, 4.95),
('Come as You Are', 1991, 9, 4.82),
('Lithium', 1991, 9, 4.75),
('Heart-Shaped Box', 1993, 9, 4.72),
-- Miles Davis
('So What', 1959, 10, 4.95),
('Blue in Green', 1959, 10, 4.92),
-- Bob Marley
('No Woman, No Cry', 1974, 11, 4.88),
('Redemption Song', 1980, 11, 4.92),
('Three Little Birds', 1977, 11, 4.85),
-- Michael Jackson
('Billie Jean', 1982, 12, 4.95),
('Thriller', 1982, 12, 4.90),
('Beat It', 1982, 12, 4.85),
('Smooth Criminal', 1987, 12, 4.88),
('Man in the Mirror', 1988, 12, 4.82);

-- ===========================================
-- USUARIOS (10 usuarios de prueba + 1 admin + 1 moderator)
-- NOTA: Las contraseñas están hasheadas con BCrypt
-- Contraseña original para todos: "password123"
-- Hash BCrypt generado con BCryptPasswordEncoder (strength=10)
-- ===========================================
INSERT INTO usuarios (nombre_usuario, mail, contrasena, avatar, biografia, fecha_registro, role, activo) VALUES 
-- Usuarios administradores y moderadores
('admin', 'admin@discsandrecords.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=70', 'Administrador del sistema Discs & Records.', CURRENT_TIMESTAMP, 'ROLE_ADMIN', true),
('moderator', 'mod@discsandrecords.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=60', 'Moderador de contenido. Mantengo el orden en la comunidad.', CURRENT_TIMESTAMP, 'ROLE_MODERATOR', true),
-- Usuarios regulares
('musicfan', 'musicfan@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=1', 'Amante de la música clásica y el rock progresivo. Colecciono vinilos desde hace 20 años.', CURRENT_TIMESTAMP, 'ROLE_USER', true),
('vinylcollector', 'vinyl@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=2', 'Coleccionista de vinilos desde 1995. Mi obsesión: primeras ediciones.', CURRENT_TIMESTAMP, 'ROLE_USER', true),
('jazzhead', 'jazz@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=3', 'El jazz es vida. Miles Davis es Dios.', CURRENT_TIMESTAMP, 'ROLE_USER', true),
('rockero70s', 'rock70s@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=4', 'Nacido en la década equivocada. Vivo en los 70s.', CURRENT_TIMESTAMP, 'ROLE_USER', true),
('hiphophead', 'hiphop@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=5', 'Rap underground y golden age. Real hip-hop only.', CURRENT_TIMESTAMP, 'ROLE_USER', true),
('melomano', 'melomano@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=6', 'Escucho de todo, menos reggaeton (bueno, a veces también).', CURRENT_TIMESTAMP, 'ROLE_USER', true),
('indiekid', 'indie@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=7', 'Bandcamp es mi segundo hogar. Apoyo artistas independientes.', CURRENT_TIMESTAMP, 'ROLE_USER', true),
('electronicvibes', 'electronic@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=8', 'Techno, house, IDM. La música electrónica es el futuro.', CURRENT_TIMESTAMP, 'ROLE_USER', true),
('metalhead666', 'metal@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=9', 'El metal nunca muere. 🤘 Thrash, death, black... todo vale.', CURRENT_TIMESTAMP, 'ROLE_USER', true),
('poprocker', 'pop@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=10', 'Pop comercial sin vergüenza. Taylor Swift fan club president.', CURRENT_TIMESTAMP, 'ROLE_USER', true);

-- ===========================================
-- RELACIONES ALBUM-GÉNERO (asociaciones)
-- ===========================================
INSERT INTO album_genero (id_album, id_genero) VALUES 
(1, 1), (1, 8), -- Dark Side: Rock, Indie
(2, 1), -- The Wall: Rock
(3, 1), -- Wish You Were Here: Rock
(4, 1), (4, 2), -- Abbey Road: Rock, Pop
(5, 1), (5, 2), -- Sgt Peppers: Rock, Pop
(6, 1), -- Revolver: Rock
(7, 1), (7, 8), -- OK Computer: Rock, Indie
(8, 5), (8, 8), -- Kid A: Electronic, Indie
(9, 1), (9, 8), -- In Rainbows: Rock, Indie
(10, 4), -- GKMC: Hip-Hop
(11, 4), (11, 3), -- TPAB: Hip-Hop, Jazz
(12, 4), -- DAMN: Hip-Hop
(13, 5), (13, 2), -- Discovery: Electronic, Pop
(14, 5), (14, 2), -- RAM: Electronic, Pop
(15, 1), -- Night at Opera: Rock
(16, 1), -- News of World: Rock
(17, 1), -- Ziggy: Rock
(18, 1), (18, 5), -- Heroes: Rock, Electronic
(19, 1), (19, 7), -- Led Zeppelin IV: Rock, Metal
(20, 1), -- Physical Graffiti: Rock
(21, 1), (21, 8), -- Nevermind: Rock, Indie
(22, 1), (22, 8), -- In Utero: Rock, Indie
(23, 3), -- Kind of Blue: Jazz
(24, 3), (24, 1), -- Bitches Brew: Jazz, Rock
(25, 10), -- Legend: Reggae
(26, 2), (26, 9), -- Thriller: Pop, R&B
(27, 2), -- Bad: Pop
(28, 1), (28, 8), -- AM: Rock, Indie
(29, 1), (29, 5), -- Currents: Rock, Electronic
(30, 9), (30, 2); -- Blonde: R&B, Pop

-- ===========================================
-- RESEÑAS DE ÁLBUMES (usuario_album)
-- NOTA: Los IDs de usuario empiezan en 3 (1=admin, 2=moderator)
-- ===========================================
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES 
(3, 1, true, 5, 'Una obra maestra absoluta. Cada canción fluye perfectamente hacia la siguiente.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, true, 5, 'El álbum perfecto. No hay una sola canción que sobre.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 7, true, 5, 'Radiohead en su máximo esplendor. Paranoid Android es simplemente genial.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 1, true, 5, 'Mi vinilo favorito de toda mi colección. Suena increíble.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 19, true, 5, 'Stairway to Heaven en vinilo original. No hay nada mejor.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 23, true, 5, 'El álbum de jazz más importante de la historia. Punto.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 24, true, 4, 'Revolucionario pero difícil de escuchar a veces. Hay que darle varias oportunidades.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 17, true, 5, 'Bowie en su era dorada. Ziggy Stardust cambió todo.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 2, true, 5, 'Pink Floyd contando una historia como nadie más puede.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 10, true, 5, 'Kendrick cambiando el juego del rap narrativo.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 11, true, 5, 'TPAB es la obra más importante del hip-hop moderno. Jazz + rap = perfección.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 26, true, 5, 'El álbum más vendido de la historia por una razón. Cada canción es un hit.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 13, true, 5, 'Discovery me introdujo a la música electrónica. Nostalgia pura.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 21, true, 5, 'El grito de una generación. Smells Like Teen Spirit lo cambió todo.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 28, true, 4, 'Arctic Monkeys maduró perfectamente con este álbum.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 13, true, 5, 'Daft Punk creó el blueprint del french house. Impecable.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 14, true, 5, 'RAM es un homenaje al disco de los 70s y 80s. Get Lucky es adictivo.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, 19, true, 5, 'El riff de Black Dog. Necesito decir más?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 26, true, 5, 'Pop perfecto. Michael Jackson era un genio.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 15, true, 5, 'Bohemian Rhapsody en este álbum. Queen son los reyes.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ===========================================
-- RESEÑAS DE CANCIONES (usuario_cancion)
-- NOTA: Los IDs de usuario empiezan en 3 (1=admin, 2=moderator)
-- ===========================================
INSERT INTO usuario_cancion (id_usuario, id_cancion, escuchada, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES 
(3, 3, true, 5, 'El solo de guitarra de Comfortably Numb es el mejor de la historia.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 8, true, 5, 'Here Comes the Sun es pura felicidad en forma de canción.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 33, true, 5, 'Stairway to Heaven: 8 minutos de perfección musical.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 41, true, 5, 'So What definió el cool jazz. Miles Davis era un visionario.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 25, true, 5, 'Bohemian Rhapsody: ópera rock que nunca será superada.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 18, true, 5, 'Alright se convirtió en himno de protesta. Kendrick es poeta.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 46, true, 5, 'Billie Jean tiene el bajo más icónico del pop.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 37, true, 5, 'Smells Like Teen Spirit: el momento en que el grunge explotó.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 21, true, 5, 'One More Time es el himno del new millennium.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 36, true, 5, 'Black Dog: esos cambios de compás son brutales.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 28, true, 5, 'Dont Stop Me Now es la canción más alegre del rock.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 11, true, 5, 'Paranoid Android es como tres canciones perfectas en una.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 4, true, 5, 'Wish You Were Here me hace llorar cada vez.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 42, true, 5, 'Blue in Green es melancolía pura. Bill Evans en su máximo.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 31, true, 5, 'Heroes: el himno del optimismo en tiempos oscuros.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
