-- Datos de prueba para Discs & Records

-- Géneros musicales
INSERT INTO generos (nombre_genero, descripcion, color) VALUES 
('Rock', 'Rock clásico y moderno', '#ED9C05'),
('Pop', 'Música popular', '#CA6703'),
('Jazz', 'Jazz y blues', '#BB3F03'),
('Hip-Hop', 'Hip-Hop y rap', '#9D2227'),
('Electronic', 'Música electrónica', '#93CFBB'),
('Classical', 'Música clásica', '#0A9295'),
('Metal', 'Heavy metal y variantes', '#015F72'),
('Indie', 'Música independiente', '#01131B');

-- Artistas
INSERT INTO artistas (nombre_artista) VALUES 
('Pink Floyd'),
('The Beatles'),
('Radiohead'),
('Kendrick Lamar'),
('Daft Punk');

-- Álbumes
INSERT INTO albumes (titulo_album, anio_salida, portada_url, id_artista) VALUES 
('The Dark Side of the Moon', 1973, 'https://example.com/dark-side.jpg', 1),
('The Wall', 1979, 'https://example.com/the-wall.jpg', 1),
('Abbey Road', 1969, 'https://example.com/abbey-road.jpg', 2),
('OK Computer', 1997, 'https://example.com/ok-computer.jpg', 3),
('good kid, m.A.A.d city', 2012, 'https://example.com/gkmc.jpg', 4);

-- Canciones
INSERT INTO canciones (titulo_cancion, anio_salida, id_artista) VALUES 
('Time', 1973, 1),
('Money', 1973, 1),
('Comfortably Numb', 1979, 1),
('Come Together', 1969, 2),
('Something', 1969, 2),
('Paranoid Android', 1997, 3),
('No Surprises', 1997, 3),
('Swimming Pools', 2012, 4),
('Poetic Justice', 2012, 4);

-- Usuarios de prueba
INSERT INTO usuarios (nombre_usuario, mail, contrasena, avatar, biografia, fecha_registro) VALUES 
('musicfan', 'musicfan@example.com', 'password123', 'https://i.pravatar.cc/150?img=1', 'Amante de la música clásica y el rock progresivo', CURRENT_TIMESTAMP),
('vinylcollector', 'vinyl@example.com', 'password123', 'https://i.pravatar.cc/150?img=2', 'Coleccionista de vinilos desde 1995', CURRENT_TIMESTAMP);
