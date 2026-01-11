-- Datos de prueba para Discs & Records

-- ===========================================
-- GÉNEROS MUSICALES (15 géneros)
-- ===========================================
INSERT INTO generos (nombre_genero, descripcion, color) VALUES ('Rock', 'Rock clásico y moderno, desde los años 50 hasta hoy', '#ED9C05');
INSERT INTO generos (nombre_genero, descripcion, color) VALUES ('Pop', 'Música popular comercial', '#CA6703');
INSERT INTO generos (nombre_genero, descripcion, color) VALUES ('Jazz', 'Jazz clásico, bebop, cool jazz y fusión', '#BB3F03');
INSERT INTO generos (nombre_genero, descripcion, color) VALUES ('Hip-Hop', 'Hip-Hop, rap y trap', '#9D2227');
INSERT INTO generos (nombre_genero, descripcion, color) VALUES ('Electronic', 'Música electrónica, EDM, house, techno', '#93CFBB');
INSERT INTO generos (nombre_genero, descripcion, color) VALUES ('Classical', 'Música clásica occidental', '#0A9295');
INSERT INTO generos (nombre_genero, descripcion, color) VALUES ('Metal', 'Heavy metal, thrash, death, black metal', '#015F72');
INSERT INTO generos (nombre_genero, descripcion, color) VALUES ('Indie', 'Música independiente y alternativa', '#01131B');
INSERT INTO generos (nombre_genero, descripcion, color) VALUES ('R&B', 'Rhythm and Blues, soul, neo-soul', '#6B4C9A');
INSERT INTO generos (nombre_genero, descripcion, color) VALUES ('Reggae', 'Reggae, dub, dancehall', '#2E8B57');
INSERT INTO generos (nombre_genero, descripcion, color) VALUES ('Folk', 'Música folk y tradicional', '#8B4513');
INSERT INTO generos (nombre_genero, descripcion, color) VALUES ('Punk', 'Punk rock, post-punk, hardcore', '#FF1493');
INSERT INTO generos (nombre_genero, descripcion, color) VALUES ('Blues', 'Blues tradicional y contemporáneo', '#4169E1');
INSERT INTO generos (nombre_genero, descripcion, color) VALUES ('Country', 'Country, americana, bluegrass', '#DAA520');
INSERT INTO generos (nombre_genero, descripcion, color) VALUES ('Latin', 'Música latina, salsa, reggaeton, bachata', '#FF6347');

-- ===========================================
-- ARTISTAS (20 artistas variados)
-- ===========================================
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('Pink Floyd', 4.85);
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('The Beatles', 4.90);
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('Radiohead', 4.75);
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('Kendrick Lamar', 4.70);
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('Daft Punk', 4.65);
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('Queen', 4.80);
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('David Bowie', 4.78);
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('Led Zeppelin', 4.82);
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('Nirvana', 4.60);
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('Miles Davis', 4.88);
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('Bob Marley', 4.72);
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('Michael Jackson', 4.85);
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('Arctic Monkeys', 4.45);
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('Tame Impala', 4.50);
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('Billie Eilish', 4.35);
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('The Weeknd', 4.40);
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('Tyler, The Creator', 4.55);
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('Frank Ocean', 4.68);
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('Beyoncé', 4.62);
INSERT INTO artistas (nombre_artista, puntuacion_media) VALUES ('Rosalía', 4.48);

-- ===========================================
-- ÁLBUMES (30 álbumes)
-- ===========================================
-- Pink Floyd
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('The Dark Side of the Moon', 1973, 'https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png', 1, 4.95);
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('The Wall', 1979, 'https://upload.wikimedia.org/wikipedia/en/1/13/TheWallCover.jpg', 1, 4.80);
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('Wish You Were Here', 1975, 'https://upload.wikimedia.org/wikipedia/en/a/a4/Pink_Floyd%2C_Wish_You_Were_Here_%281975%29.png', 1, 4.85);
-- The Beatles
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('Abbey Road', 1969, 'https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg', 2, 4.92);
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('Sgt. Peppers Lonely Hearts Club Band', 1967, 'https://upload.wikimedia.org/wikipedia/en/5/50/Sgt._Pepper%27s_Lonely_Hearts_Club_Band.jpg', 2, 4.88);
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('Revolver', 1966, 'https://upload.wikimedia.org/wikipedia/en/1/16/Revolver_%28album_cover%29.jpg', 2, 4.75);
-- Radiohead
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('OK Computer', 1997, 'https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png', 3, 4.90);
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('Kid A', 2000, 'https://upload.wikimedia.org/wikipedia/en/b/b5/Radiohead.kida.albumart.jpg', 3, 4.82);
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('In Rainbows', 2007, 'https://upload.wikimedia.org/wikipedia/en/2/2e/In_Rainbows_Official_Cover.jpg', 3, 4.78);
-- Kendrick Lamar
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('good kid, m.A.A.d city', 2012, 'https://upload.wikimedia.org/wikipedia/en/3/3c/Good_kid_m.A.A.d_city_deluxe.jpg', 4, 4.88);
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('To Pimp a Butterfly', 2015, 'https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png', 4, 4.92);
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('DAMN.', 2017, 'https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png', 4, 4.65);
-- Daft Punk
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('Discovery', 2001, 'https://upload.wikimedia.org/wikipedia/en/a/ae/Daft_Punk_-_Discovery.jpg', 5, 4.85);
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('Random Access Memories', 2013, 'https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg', 5, 4.78);
-- Queen
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('A Night at the Opera', 1975, 'https://upload.wikimedia.org/wikipedia/en/4/4d/Queen_A_Night_At_The_Opera.png', 6, 4.88);
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('News of the World', 1977, 'https://upload.wikimedia.org/wikipedia/en/e/ea/Queen_News_Of_The_World.png', 6, 4.72);
-- David Bowie
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('The Rise and Fall of Ziggy Stardust', 1972, 'https://upload.wikimedia.org/wikipedia/en/0/01/ZiggyStardust.jpg', 7, 4.90);
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('Heroes', 1977, 'https://upload.wikimedia.org/wikipedia/en/3/32/David_Bowie_-_%22Heroes%22.jpg', 7, 4.75);
-- Led Zeppelin
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('Led Zeppelin IV', 1971, 'https://upload.wikimedia.org/wikipedia/en/2/26/Led_Zeppelin_-_Led_Zeppelin_IV.jpg', 8, 4.95);
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('Physical Graffiti', 1975, 'https://upload.wikimedia.org/wikipedia/en/e/e3/Led_Zeppelin_-_Physical_Graffiti.jpg', 8, 4.80);
-- Nirvana
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('Nevermind', 1991, 'https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg', 9, 4.85);
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('In Utero', 1993, 'https://upload.wikimedia.org/wikipedia/en/e/e5/In_Utero_%28Nirvana%29_album_cover.jpg', 9, 4.68);
-- Miles Davis
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('Kind of Blue', 1959, 'https://upload.wikimedia.org/wikipedia/en/9/9c/MilesDavisKindofBlue.jpg', 10, 4.98);
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('Bitches Brew', 1970, 'https://upload.wikimedia.org/wikipedia/en/7/7d/Bitches_brew.jpg', 10, 4.72);
-- Bob Marley
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('Legend', 1984, 'https://upload.wikimedia.org/wikipedia/en/d/d9/Bob_Marley_-_Legend_album_cover.jpg', 11, 4.80);
-- Michael Jackson
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('Thriller', 1982, 'https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png', 12, 4.92);
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('Bad', 1987, 'https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png', 12, 4.70);
-- Arctic Monkeys
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('AM', 2013, 'https://upload.wikimedia.org/wikipedia/commons/0/0d/AM_%28Arctic_Monkeys%29.jpg', 13, 4.55);
-- Tame Impala
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('Currents', 2015, 'https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png', 14, 4.65);
-- Frank Ocean
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista, puntuacion_media) VALUES ('Blonde', 2016, 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg', 18, 4.85);

-- ===========================================
-- CANCIONES (50 canciones)
-- ===========================================
-- Pink Floyd
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Time', 1973, 1, 4.90);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Money', 1973, 1, 4.75);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Comfortably Numb', 1979, 1, 4.95);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Wish You Were Here', 1975, 1, 4.92);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Shine On You Crazy Diamond', 1975, 1, 4.88);
-- The Beatles
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Come Together', 1969, 2, 4.85);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Something', 1969, 2, 4.80);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Here Comes the Sun', 1969, 2, 4.90);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Let It Be', 1970, 2, 4.88);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Yesterday', 1965, 2, 4.92);
-- Radiohead
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Paranoid Android', 1997, 3, 4.88);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('No Surprises', 1997, 3, 4.75);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Karma Police', 1997, 3, 4.82);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Creep', 1992, 3, 4.60);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Everything In Its Right Place', 2000, 3, 4.78);
-- Kendrick Lamar
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Swimming Pools', 2012, 4, 4.65);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Poetic Justice', 2012, 4, 4.58);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Alright', 2015, 4, 4.88);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('HUMBLE.', 2017, 4, 4.72);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('DNA.', 2017, 4, 4.78);
-- Daft Punk
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('One More Time', 2001, 5, 4.85);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Digital Love', 2001, 5, 4.78);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Get Lucky', 2013, 5, 4.82);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Instant Crush', 2013, 5, 4.68);
-- Queen
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Bohemian Rhapsody', 1975, 6, 4.98);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('We Will Rock You', 1977, 6, 4.85);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('We Are the Champions', 1977, 6, 4.82);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Dont Stop Me Now', 1978, 6, 4.90);
-- David Bowie
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Starman', 1972, 7, 4.85);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Space Oddity', 1969, 7, 4.88);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Heroes', 1977, 7, 4.92);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Life on Mars?', 1971, 7, 4.90);
-- Led Zeppelin
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Stairway to Heaven', 1971, 8, 4.98);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Whole Lotta Love', 1969, 8, 4.85);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Kashmir', 1975, 8, 4.90);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Black Dog', 1971, 8, 4.78);
-- Nirvana
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Smells Like Teen Spirit', 1991, 9, 4.95);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Come as You Are', 1991, 9, 4.82);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Lithium', 1991, 9, 4.75);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Heart-Shaped Box', 1993, 9, 4.72);
-- Miles Davis
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('So What', 1959, 10, 4.95);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Blue in Green', 1959, 10, 4.92);
-- Bob Marley
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('No Woman, No Cry', 1974, 11, 4.88);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Redemption Song', 1980, 11, 4.92);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Three Little Birds', 1977, 11, 4.85);
-- Michael Jackson
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Billie Jean', 1982, 12, 4.95);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Thriller', 1982, 12, 4.90);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Beat It', 1982, 12, 4.85);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Smooth Criminal', 1987, 12, 4.88);
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista, puntuacion_media) VALUES ('Man in the Mirror', 1988, 12, 4.82);

-- ===========================================
-- USUARIOS (10 usuarios de prueba + 1 admin + 1 moderator)
-- NOTA: Las contraseñas están hasheadas con BCrypt
-- Contraseña original para todos: "password123"
-- Hash BCrypt generado con BCryptPasswordEncoder (strength=10)
-- ===========================================
-- Usuarios administradores y moderadores
INSERT INTO usuarios (nombre_usuario, mail, contrasena, avatar, biografia, fecha_registro, role, activo) VALUES ('admin', 'admin@discsandrecords.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=70', 'Administrador del sistema Discs & Records.', CURRENT_TIMESTAMP, 'ROLE_ADMIN', true);
INSERT INTO usuarios (nombre_usuario, mail, contrasena, avatar, biografia, fecha_registro, role, activo) VALUES ('moderator', 'mod@discsandrecords.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=60', 'Moderador de contenido. Mantengo el orden en la comunidad.', CURRENT_TIMESTAMP, 'ROLE_MODERATOR', true);
-- Usuarios regulares
INSERT INTO usuarios (nombre_usuario, mail, contrasena, avatar, biografia, fecha_registro, role, activo) VALUES ('musicfan', 'musicfan@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=1', 'Amante de la música clásica y el rock progresivo. Colecciono vinilos desde hace 20 años.', CURRENT_TIMESTAMP, 'ROLE_USER', true);
INSERT INTO usuarios (nombre_usuario, mail, contrasena, avatar, biografia, fecha_registro, role, activo) VALUES ('vinylcollector', 'vinyl@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=2', 'Coleccionista de vinilos desde 1995. Mi obsesión: primeras ediciones.', CURRENT_TIMESTAMP, 'ROLE_USER', true);
INSERT INTO usuarios (nombre_usuario, mail, contrasena, avatar, biografia, fecha_registro, role, activo) VALUES ('jazzhead', 'jazz@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=3', 'El jazz es vida. Miles Davis es Dios.', CURRENT_TIMESTAMP, 'ROLE_USER', true);
INSERT INTO usuarios (nombre_usuario, mail, contrasena, avatar, biografia, fecha_registro, role, activo) VALUES ('rockero70s', 'rock70s@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=4', 'Nacido en la década equivocada. Vivo en los 70s.', CURRENT_TIMESTAMP, 'ROLE_USER', true);
INSERT INTO usuarios (nombre_usuario, mail, contrasena, avatar, biografia, fecha_registro, role, activo) VALUES ('hiphophead', 'hiphop@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=5', 'Rap underground y golden age. Real hip-hop only.', CURRENT_TIMESTAMP, 'ROLE_USER', true);
INSERT INTO usuarios (nombre_usuario, mail, contrasena, avatar, biografia, fecha_registro, role, activo) VALUES ('melomano', 'melomano@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=6', 'Escucho de todo, menos reggaeton (bueno, a veces también).', CURRENT_TIMESTAMP, 'ROLE_USER', true);
INSERT INTO usuarios (nombre_usuario, mail, contrasena, avatar, biografia, fecha_registro, role, activo) VALUES ('indiekid', 'indie@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=7', 'Bandcamp es mi segundo hogar. Apoyo artistas independientes.', CURRENT_TIMESTAMP, 'ROLE_USER', true);
INSERT INTO usuarios (nombre_usuario, mail, contrasena, avatar, biografia, fecha_registro, role, activo) VALUES ('electronicvibes', 'electronic@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=8', 'Techno, house, IDM. La música electrónica es el futuro.', CURRENT_TIMESTAMP, 'ROLE_USER', true);
INSERT INTO usuarios (nombre_usuario, mail, contrasena, avatar, biografia, fecha_registro, role, activo) VALUES ('metalhead666', 'metal@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=9', 'El metal nunca muere. 🤘 Thrash, death, black... todo vale.', CURRENT_TIMESTAMP, 'ROLE_USER', true);
INSERT INTO usuarios (nombre_usuario, mail, contrasena, avatar, biografia, fecha_registro, role, activo) VALUES ('poprocker', 'pop@example.com', '$2a$10$4YjRWCyaah5J8G.lmgLUluIH4ormT9qjPzJHCiN2bBrSx6SctLiDG', 'https://i.pravatar.cc/150?img=10', 'Pop comercial sin vergüenza. Taylor Swift fan club president.', CURRENT_TIMESTAMP, 'ROLE_USER', true);

-- ===========================================
-- RELACIONES ALBUM-GÉNERO (asociaciones)
-- ===========================================
INSERT INTO album_genero (id_album, id_genero) VALUES (1, 1); -- Dark Side: Rock
INSERT INTO album_genero (id_album, id_genero) VALUES (1, 8); -- Dark Side: Indie
INSERT INTO album_genero (id_album, id_genero) VALUES (2, 1); -- The Wall: Rock
INSERT INTO album_genero (id_album, id_genero) VALUES (3, 1); -- Wish You Were Here: Rock
INSERT INTO album_genero (id_album, id_genero) VALUES (4, 1); -- Abbey Road: Rock
INSERT INTO album_genero (id_album, id_genero) VALUES (4, 2); -- Abbey Road: Pop
INSERT INTO album_genero (id_album, id_genero) VALUES (5, 1); -- Sgt Peppers: Rock
INSERT INTO album_genero (id_album, id_genero) VALUES (5, 2); -- Sgt Peppers: Pop
INSERT INTO album_genero (id_album, id_genero) VALUES (6, 1); -- Revolver: Rock
INSERT INTO album_genero (id_album, id_genero) VALUES (7, 1); -- OK Computer: Rock
INSERT INTO album_genero (id_album, id_genero) VALUES (7, 8); -- OK Computer: Indie
INSERT INTO album_genero (id_album, id_genero) VALUES (8, 5); -- Kid A: Electronic
INSERT INTO album_genero (id_album, id_genero) VALUES (8, 8); -- Kid A: Indie
INSERT INTO album_genero (id_album, id_genero) VALUES (9, 1); -- In Rainbows: Rock
INSERT INTO album_genero (id_album, id_genero) VALUES (9, 8); -- In Rainbows: Indie
INSERT INTO album_genero (id_album, id_genero) VALUES (10, 4); -- GKMC: Hip-Hop
INSERT INTO album_genero (id_album, id_genero) VALUES (11, 4); -- TPAB: Hip-Hop
INSERT INTO album_genero (id_album, id_genero) VALUES (11, 3); -- TPAB: Jazz
INSERT INTO album_genero (id_album, id_genero) VALUES (12, 4); -- DAMN: Hip-Hop
INSERT INTO album_genero (id_album, id_genero) VALUES (13, 5); -- Discovery: Electronic
INSERT INTO album_genero (id_album, id_genero) VALUES (13, 2); -- Discovery: Pop
INSERT INTO album_genero (id_album, id_genero) VALUES (14, 5); -- RAM: Electronic
INSERT INTO album_genero (id_album, id_genero) VALUES (14, 2); -- RAM: Pop
INSERT INTO album_genero (id_album, id_genero) VALUES (15, 1); -- Night at Opera: Rock
INSERT INTO album_genero (id_album, id_genero) VALUES (16, 1); -- News of World: Rock
INSERT INTO album_genero (id_album, id_genero) VALUES (17, 1); -- Ziggy: Rock
INSERT INTO album_genero (id_album, id_genero) VALUES (18, 1); -- Heroes: Rock
INSERT INTO album_genero (id_album, id_genero) VALUES (18, 5); -- Heroes: Electronic
INSERT INTO album_genero (id_album, id_genero) VALUES (19, 1); -- Led Zeppelin IV: Rock
INSERT INTO album_genero (id_album, id_genero) VALUES (19, 7); -- Led Zeppelin IV: Metal
INSERT INTO album_genero (id_album, id_genero) VALUES (20, 1); -- Physical Graffiti: Rock
INSERT INTO album_genero (id_album, id_genero) VALUES (21, 1); -- Nevermind: Rock
INSERT INTO album_genero (id_album, id_genero) VALUES (21, 8); -- Nevermind: Indie
INSERT INTO album_genero (id_album, id_genero) VALUES (22, 1); -- In Utero: Rock
INSERT INTO album_genero (id_album, id_genero) VALUES (22, 8); -- In Utero: Indie
INSERT INTO album_genero (id_album, id_genero) VALUES (23, 3); -- Kind of Blue: Jazz
INSERT INTO album_genero (id_album, id_genero) VALUES (24, 3); -- Bitches Brew: Jazz
INSERT INTO album_genero (id_album, id_genero) VALUES (24, 1); -- Bitches Brew: Rock
INSERT INTO album_genero (id_album, id_genero) VALUES (25, 10); -- Legend: Reggae
INSERT INTO album_genero (id_album, id_genero) VALUES (26, 2); -- Thriller: Pop
INSERT INTO album_genero (id_album, id_genero) VALUES (26, 9); -- Thriller: R&B
INSERT INTO album_genero (id_album, id_genero) VALUES (27, 2); -- Bad: Pop
INSERT INTO album_genero (id_album, id_genero) VALUES (28, 1); -- AM: Rock
INSERT INTO album_genero (id_album, id_genero) VALUES (28, 8); -- AM: Indie
INSERT INTO album_genero (id_album, id_genero) VALUES (29, 1); -- Currents: Rock
INSERT INTO album_genero (id_album, id_genero) VALUES (29, 5); -- Currents: Electronic
INSERT INTO album_genero (id_album, id_genero) VALUES (30, 9); -- Blonde: R&B
INSERT INTO album_genero (id_album, id_genero) VALUES (30, 2); -- Blonde: Pop

-- ===========================================
-- RESEÑAS DE ÁLBUMES (usuario_album)
-- NOTA: Los IDs de usuario empiezan en 3 (1=admin, 2=moderator)
-- ===========================================
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (3, 1, true, 5, 'Una obra maestra absoluta. Cada canción fluye perfectamente hacia la siguiente.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (3, 4, true, 5, 'El álbum perfecto. No hay una sola canción que sobre.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (3, 7, true, 5, 'Radiohead en su máximo esplendor. Paranoid Android es simplemente genial.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (4, 1, true, 5, 'Mi vinilo favorito de toda mi colección. Suena increíble.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (4, 19, true, 5, 'Stairway to Heaven en vinilo original. No hay nada mejor.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (5, 23, true, 5, 'El álbum de jazz más importante de la historia. Punto.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (5, 24, true, 4, 'Revolucionario pero difícil de escuchar a veces. Hay que darle varias oportunidades.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (6, 17, true, 5, 'Bowie en su era dorada. Ziggy Stardust cambió todo.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (6, 2, true, 5, 'Pink Floyd contando una historia como nadie más puede.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (7, 10, true, 5, 'Kendrick cambiando el juego del rap narrativo.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (7, 11, true, 5, 'TPAB es la obra más importante del hip-hop moderno. Jazz + rap = perfección.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (8, 26, true, 5, 'El álbum más vendido de la historia por una razón. Cada canción es un hit.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (8, 13, true, 5, 'Discovery me introdujo a la música electrónica. Nostalgia pura.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (9, 21, true, 5, 'El grito de una generación. Smells Like Teen Spirit lo cambió todo.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (9, 28, true, 4, 'Arctic Monkeys maduró perfectamente con este álbum.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (10, 13, true, 5, 'Daft Punk creó el blueprint del french house. Impecable.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (10, 14, true, 5, 'RAM es un homenaje al disco de los 70s y 80s. Get Lucky es adictivo.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (11, 19, true, 5, 'El riff de Black Dog. Necesito decir más?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (12, 26, true, 5, 'Pop perfecto. Michael Jackson era un genio.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_album (id_usuario, id_album, escuchado, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (12, 15, true, 5, 'Bohemian Rhapsody en este álbum. Queen son los reyes.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ===========================================
-- RESEÑAS DE CANCIONES (usuario_cancion)
-- NOTA: Los IDs de usuario empiezan en 3 (1=admin, 2=moderator)
-- ===========================================
INSERT INTO usuario_cancion (id_usuario, id_cancion, escuchada, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (3, 3, true, 5, 'El solo de guitarra de Comfortably Numb es el mejor de la historia.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_cancion (id_usuario, id_cancion, escuchada, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (3, 8, true, 5, 'Here Comes the Sun es pura felicidad en forma de canción.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_cancion (id_usuario, id_cancion, escuchada, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (4, 33, true, 5, 'Stairway to Heaven: 8 minutos de perfección musical.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_cancion (id_usuario, id_cancion, escuchada, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (5, 41, true, 5, 'So What definió el cool jazz. Miles Davis era un visionario.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_cancion (id_usuario, id_cancion, escuchada, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (6, 25, true, 5, 'Bohemian Rhapsody: ópera rock que nunca será superada.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_cancion (id_usuario, id_cancion, escuchada, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (7, 18, true, 5, 'Alright se convirtió en himno de protesta. Kendrick es poeta.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_cancion (id_usuario, id_cancion, escuchada, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (8, 46, true, 5, 'Billie Jean tiene el bajo más icónico del pop.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_cancion (id_usuario, id_cancion, escuchada, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (9, 37, true, 5, 'Smells Like Teen Spirit: el momento en que el grunge explotó.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_cancion (id_usuario, id_cancion, escuchada, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (10, 21, true, 5, 'One More Time es el himno del new millennium.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_cancion (id_usuario, id_cancion, escuchada, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (9, 36, true, 5, 'Black Dog: esos cambios de compás son brutales.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_cancion (id_usuario, id_cancion, escuchada, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (10, 28, true, 5, 'Dont Stop Me Now es la canción más alegre del rock.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_cancion (id_usuario, id_cancion, escuchada, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (1, 11, true, 5, 'Paranoid Android es como tres canciones perfectas en una.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_cancion (id_usuario, id_cancion, escuchada, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (2, 4, true, 5, 'Wish You Were Here me hace llorar cada vez.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_cancion (id_usuario, id_cancion, escuchada, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (3, 42, true, 5, 'Blue in Green es melancolía pura. Bill Evans en su máximo.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO usuario_cancion (id_usuario, id_cancion, escuchada, puntuacion, texto_resena, fecha_agregada, fecha_resena) VALUES (4, 31, true, 5, 'Heroes: el himno del optimismo en tiempos oscuros.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
-- ===========================================
-- USUARIO ADMIN INICIAL (para testing)
-- ===========================================
-- Email: admin@discsandrecords.com
-- Contraseña: Admin123! (hasheada con BCrypt)
-- Nota: El hash es de prueba, en producción usar valores reales
INSERT INTO usuarios (nombre_usuario, mail, contrasena, avatar, biografia, fecha_registro, rol, activo) VALUES 
('admin_system', 'admin@discsandrecords.com', '$2a$10$PNvY5FPPfJQfmKnPXo7VdOkgGLhfY.ZQGG5Wz5M6RqXzPgGKEUEAe', 
 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin', 
 'Administrador del sistema - Cuenta de prueba', 
 CURRENT_TIMESTAMP, 'ROLE_ADMIN', true);