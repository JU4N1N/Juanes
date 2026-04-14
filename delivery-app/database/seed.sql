--  Tablas: restaurants, menu_items
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS restaurants;


-- 1. Tabla restaurants
CREATE TABLE restaurants (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(100)  NOT NULL,
    description TEXT,
    image_url   VARCHAR(255),
    category    VARCHAR(50),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



-- 2. Tabla menu_items
CREATE TABLE menu_items (
    id            INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT           NOT NULL,
    name          VARCHAR(100)  NOT NULL,
    description   TEXT,
    price         DECIMAL(8,2)  NOT NULL,
    image_url     VARCHAR(255),
    available     BOOLEAN       DEFAULT TRUE,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);



-- 3. INSERTs — restaurants (15 restaurantes)
INSERT INTO restaurants (name, description, image_url, category) VALUES
-- 1
('La Burguesía',
 'Las mejores hamburguesas artesanales de la ciudad, con carne de res Angus y panes horneados en casa.',
 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
 'Hamburguesas'),
-- 2
('Pizza Nostra',
 'Pizzas al estilo napolitano con masa madre, ingredientes importados y horno de leña.',
 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
 'Pizza'),
-- 3
('Sushi Nagoya',
 'Auténtica cocina japonesa: rolls, sashimi y nigiri preparados por chefs con formación en Osaka.',
 'https://images.unsplash.com/photo-1553621042-f6e147245754',
 'Japonesa'),
-- 4
('Tacos El Compadre',
 'Tacos de canasta, al pastor y de guisado. Tradición mexicana desde 1987.',
 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47',
 'Mexicana'),
-- 5
('The Wok House',
 'Comida china con wok a fuego alto: chow mein, dim sum y pato pekín.',
 'https://images.unsplash.com/photo-1563245372-f21724e3856d',
 'China'),
-- 6
('Pollo Loco BBQ',
 'Pollo a la leña, costillas BBQ y alitas con más de 10 salsas propias.',
 'https://images.unsplash.com/photo-1598103442097-8b74394b95c1',
 'BBQ'),
-- 7
('Pasta & Basta',
 'Pastas frescas hechas a mano: fettuccine, ravioles y gnocchi con salsas italianas clásicas.',
 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
 'Italiana'),
-- 8
('Green Bowl',
 'Cocina plant-based: bowls, wraps y jugos naturales para un estilo de vida saludable.',
 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
 'Saludable'),
-- 9
('La Taquiza Norteña',
 'Arrachera, machaca, carne asada y birria de res. Sabores del norte de México.',
 'https://images.unsplash.com/photo-1604467715878-83e57e8bc129',
 'Mexicana'),
-- 10
('Seoul Kitchen',
 'Auténtica cocina coreana: bibimbap, bulgogi, ramen y kimchi casero.',
 'https://images.unsplash.com/photo-1590301157890-4810ed352733',
 'Coreana'),
-- 11
('Le Crêperie',
 'Crêpes dulces y saladas, quiches y café de especialidad. Ambiente parisino.',
 'https://images.unsplash.com/photo-1519676867240-f03562e64548',
 'Francesa'),
-- 12
('Mariscos El Capitán',
 'Coctel de camarón, ceviche, tostadas y pescado a la talla. Fresco del día.',
 'https://images.unsplash.com/photo-1626082927389-6cd097cee6b4',
 'Mariscos'),
-- 13
('Smash Bros Burgers',
 'Smash burgers con doble patty, queso americano fundido y salsas secretas.',
 'https://images.unsplash.com/photo-1550547660-d9450f859349',
 'Hamburguesas'),
-- 14
('Indian Spice Garden',
 'Curry, tikka masala, naan y biryani. Especias auténticas traídas directamente de la India.',
 'https://images.unsplash.com/photo-1585937421612-70a008356fbe',
 'India'),
-- 15
('Dulce Tentación',
 'Postres artesanales: pasteles, cheesecakes, brownies y helados de sabores únicos.',
 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
 'Postres');



-- 4. INSERTs — menu_items (5 por restaurante = 75 items)

-- ---- Restaurante 1: La Burguesía ----
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, available) VALUES
(1, 'Burger Clásica',       'Res Angus, lechuga, tomate, cebolla y aderezo de la casa.',        129.00, 'https://images.unsplash.com/photo-1550317138-10000687a72b', TRUE),
(1, 'Burger BBQ Bacon',     'Doble carne, tocino crujiente, queso cheddar y salsa BBQ.',         159.00, 'https://images.unsplash.com/photo-1561758033-d89a9ad46330', TRUE),
(1, 'Mushroom Swiss',       'Champiñones salteados, queso suizo y mayonesa de trufa.',           149.00, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', TRUE),
(1, 'Papas con Queso',      'Papas a la francesa con queso cheddar fundido y jalapeños.',         69.00, 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752', TRUE),
(1, 'Malteada de Oreo',     'Malteada artesanal de vainilla con galletas Oreo trituradas.',       89.00, 'https://images.unsplash.com/photo-1572490122747-3a3f4b53d628', TRUE);

-- ---- Restaurante 2: Pizza Nostra ----
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, available) VALUES
(2, 'Margherita',           'Salsa de tomate San Marzano, mozzarella fresca y albahaca.',        149.00, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002', TRUE),
(2, 'Pepperoni Clásica',    'Doble pepperoni, mozzarella derretida y orégano fresco.',           169.00, 'https://images.unsplash.com/photo-1513104890138-7c749659a591', TRUE),
(2, 'Cuatro Quesos',        'Mozzarella, gorgonzola, parmesano y brie sobre salsa blanca.',      179.00, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38', TRUE),
(2, 'Prosciutto e Rucola',  'Prosciutto di Parma, rúcula fresca y parmesano rallado.',           189.00, 'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5', TRUE),
(2, 'Tiramisú',             'Postre clásico italiano con mascarpone, café y cacao.',              89.00, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9', TRUE);

-- ---- Restaurante 3: Sushi Nagoya ----
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, available) VALUES
(3, 'Roll California',      '8 piezas de pepino, aguacate y surimi con ajonjolí.',               109.00, 'https://images.unsplash.com/photo-1617196034183-421b4040d25b', TRUE),
(3, 'Dragon Roll',          'Camarón tempura cubierto de aguacate y salsa de anguila.',          149.00, 'https://images.unsplash.com/photo-1553621042-f6e147245754', TRUE),
(3, 'Sashimi Mix (12 pz)',  'Selección de atún, salmón y pez blanco, corte del chef.',          199.00, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836', TRUE),
(3, 'Ramen Tonkotsu',       'Caldo de cerdo 12 horas, chashu, huevo marinado y nori.',          169.00, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624', TRUE),
(3, 'Edamame con Sal',      'Vainas de soya cocidas al vapor con sal de mar.',                    59.00, 'https://images.unsplash.com/photo-1546069901-5ec6a79120b0', TRUE);

-- ---- Restaurante 4: Tacos El Compadre ----
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, available) VALUES
(4, 'Taco al Pastor',       'Carne de cerdo marinada con piña, cilantro y cebolla.',              25.00, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE),
(4, 'Taco de Canasta',      'Relleno de frijol, chicharrón o papa. La clásica mexicana.',         18.00, 'https://images.unsplash.com/photo-1604467715878-83e57e8bc129', TRUE),
(4, 'Quesadilla de Flor',   'Flor de calabaza, epazote y queso Oaxaca en tortilla de maíz.',     55.00, 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE),
(4, 'Orden Guisado x3',     'Tres tacos de tu guisado favorito del día.',                         65.00, 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE),
(4, 'Agua de Jamaica 1L',   'Agua fresca de flor de jamaica con hielo.',                          35.00, 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8', TRUE);

-- ---- Restaurante 5: The Wok House ----
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, available) VALUES
(5, 'Chow Mein de Pollo',   'Fideos salteados al wok con pollo, zanahoria y salsa de soya.',    119.00, 'https://images.unsplash.com/photo-1563245372-f21724e3856d', TRUE),
(5, 'Dim Sum Mixto (8 pz)', 'Gyozas al vapor rellenas de cerdo, camarón y vegetales.',          129.00, 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c', TRUE),
(5, 'Pato Pekín',           'Pato horneado con salsa hoisin, pepino y tortillas de trigo.',     249.00, 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd', TRUE),
(5, 'Arroz Frito Especial', 'Arroz wok con huevo, camarón, chícharo y cebollín.',                99.00, 'https://images.unsplash.com/photo-1603133872878-684f208fb84b', TRUE),
(5, 'Sopa Wonton',          'Caldo de pollo con wontons rellenos de cerdo y jengibre.',           79.00, 'https://images.unsplash.com/photo-1547592166-23ac45744acd', TRUE);

-- ---- Restaurante 6: Pollo Loco BBQ ----
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, available) VALUES
(6, 'Pollo Entero a la Leña','Pollo entero rostizado en leña de mezquite con papas.',           259.00, 'https://images.unsplash.com/photo-1598103442097-8b74394b95c1', TRUE),
(6, 'Costillas BBQ (500g)',  'Costillas de cerdo bañadas en salsa BBQ ahumada.',                229.00, 'https://images.unsplash.com/photo-1544025162-d76694265947', TRUE),
(6, 'Alitas x12',           'Alitas a elegir: buffalo, mango habanero o BBQ clásico.',          169.00, 'https://images.unsplash.com/photo-1527477396000-e27163b481c2', TRUE),
(6, 'Combo Familiar',       'Pollo entero + costillas 250g + coleslaw + pan de ajo.',           349.00, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1', TRUE),
(6, 'Elote Asado BBQ',      'Elote a la parrilla con mantequilla, queso y chile piquín.',        49.00, 'https://images.unsplash.com/photo-1551754655-cd27e38d2076', TRUE);

-- ---- Restaurante 7: Pasta & Basta ----
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, available) VALUES
(7, 'Fettuccine Alfredo',   'Fettuccine fresco con crema, parmesano y nuez moscada.',           149.00, 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9', TRUE),
(7, 'Ravioles de Ricota',   'Ravioles rellenos de ricota y espinaca, con salsa de tomate.',     169.00, 'https://images.unsplash.com/photo-1551183053-bf91798d765e', TRUE),
(7, 'Gnocchi al Pesto',     'Gnocchi de papa con pesto genovés, piñones y parmesano.',          159.00, 'https://images.unsplash.com/photo-1547592180-85f173990554', TRUE),
(7, 'Lasaña Bolognesa',     'Capas de pasta fresca, ragú de res y bechamel gratinada.',         179.00, 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3', TRUE),
(7, 'Pannacotta',           'Crema italiana con coulis de frutos rojos.',                         89.00, 'https://images.unsplash.com/photo-1488477181946-6428a0291777', TRUE);

-- ---- Restaurante 8: Green Bowl ----
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, available) VALUES
(8, 'Buddha Bowl',          'Quinoa, garbanzos, aguacate, zanahoria y aderezo tahini.',         139.00, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', TRUE),
(8, 'Wrap Vegano',          'Tortilla de espinaca con hummus, vegetales asados y germinados.',   119.00, 'https://images.unsplash.com/photo-1594834749984-3a6e31d7e305', TRUE),
(8, 'Smoothie Verde',       'Espinaca, manzana, pepino, jengibre y limón. Sin azúcar.',          89.00, 'https://images.unsplash.com/photo-1638176067247-19a1d42a5929', TRUE),
(8, 'Açaí Bowl',            'Base de açaí con granola, plátano, fresas y miel de agave.',       129.00, 'https://images.unsplash.com/photo-1590301157890-4810ed352733', TRUE),
(8, 'Proteína de Tofu',     'Tofu marinado a la plancha con arroz integral y brócoli al vapor.',134.00, 'https://images.unsplash.com/photo-1546069901-5ec6a79120b0', TRUE);

-- ---- Restaurante 9: La Taquiza Norteña ----
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, available) VALUES
(9, 'Taco de Arrachera',    'Arrachera a la plancha, guacamole y salsa roja tatemada.',          55.00, 'https://images.unsplash.com/photo-1604467715878-83e57e8bc129', TRUE),
(9, 'Taco de Birria',       'Birria de res jugosa con consomé para remojar.',                     50.00, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE),
(9, 'Machaca con Huevo',    'Carne seca deshebrada con huevo, tomate y chile verde.',             95.00, 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE),
(9, 'Carne Asada 200g',     'Carne de res asada al carbón con tortillas y guarnición.',          169.00, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1', TRUE),
(9, 'Agua de Horchata 1L',  'Horchata de arroz con canela, fría y natural.',                      35.00, 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8', TRUE);

-- ---- Restaurante 10: Seoul Kitchen ----
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, available) VALUES
(10, 'Bibimbap',            'Arroz con vegetales, carne de res, huevo y pasta gochujang.',      149.00, 'https://images.unsplash.com/photo-1590301157890-4810ed352733', TRUE),
(10, 'Bulgogi',             'Res marinada en salsa dulce de soya, servida con arroz.',           169.00, 'https://images.unsplash.com/photo-1563245372-f21724e3856d', TRUE),
(10, 'Ramen Coreano',       'Caldo picante con noodles, cerdo, huevo y alga nori.',             159.00, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624', TRUE),
(10, 'Kimchi Pancake',      'Jeon de kimchi crujiente, servido con salsa de soya y sésamo.',    109.00, 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c', TRUE),
(10, 'Tteokbokki',          'Pastelitos de arroz en salsa gochujang picante con fishcake.',      119.00, 'https://images.unsplash.com/photo-1547592180-85f173990554', TRUE);

-- ---- Restaurante 11: Le Crêperie ----
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, available) VALUES
(11, 'Crêpe Jamón y Queso', 'Crêpe salada con jamón serrano y queso gruyère gratinado.',        119.00, 'https://images.unsplash.com/photo-1519676867240-f03562e64548', TRUE),
(11, 'Crêpe Nutella',       'Crêpe dulce con Nutella, plátano y azúcar glass.',                  99.00, 'https://images.unsplash.com/photo-1488477181946-6428a0291777', TRUE),
(11, 'Quiche Lorraine',     'Quiche de tocino y queso con masa quebrada horneada.',              129.00, 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3', TRUE),
(11, 'Café au Lait',        'Café de especialidad con leche vaporizada al estilo francés.',       59.00, 'https://images.unsplash.com/photo-1442512595331-e89e73853f31', TRUE),
(11, 'Croissant de Almendra','Croissant horneado relleno de crema de almendra y glaseado.',      79.00, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a', TRUE);

-- ---- Restaurante 12: Mariscos El Capitán ----
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, available) VALUES
(12, 'Ceviche Clásico',     'Camarón y pescado marinados en limón, pepino, cebolla y chile.',  149.00, 'https://images.unsplash.com/photo-1626082927389-6cd097cee6b4', TRUE),
(12, 'Coctel de Camarón',   'Camarones en salsa catsup con aguacate, pepino y limón.',          159.00, 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2', TRUE),
(12, 'Tostada de Marlín',   'Marlín ahumado sobre tostada con aguacate y chile serrano.',       129.00, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE),
(12, 'Pescado a la Talla',  'Pescado entero al carbón con adobo rojo y salsa verde.',           249.00, 'https://images.unsplash.com/photo-1559847844-5315695dadae', TRUE),
(12, 'Camarones al Mojo',   'Camarones salteados con mantequilla, ajo y perejil, con arroz.',  199.00, 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47', TRUE);

-- ---- Restaurante 13: Smash Bros Burgers ----
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, available) VALUES
(13, 'Single Smash',        'Una patty aplastada, queso americano, pepinillo y mostaza.',       119.00, 'https://images.unsplash.com/photo-1550547660-d9450f859349', TRUE),
(13, 'Double Smash',        'Doble patty, doble queso, cebolla caramelizada y salsa secreta.',  149.00, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', TRUE),
(13, 'Smash Bacon Jalapeño','Doble carne, tocino, jalapeño fresco y queso pepper jack.',        159.00, 'https://images.unsplash.com/photo-1561758033-d89a9ad46330', TRUE),
(13, 'Smash Fries',         'Papas fritas con queso cheddar, jalapeño y crema agria.',          79.00, 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752', TRUE),
(13, 'Shake de Fresa',      'Malteada artesanal de fresas naturales con leche entera.',          89.00, 'https://images.unsplash.com/photo-1572490122747-3a3f4b53d628', TRUE);

-- ---- Restaurante 14: Indian Spice Garden ----
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, available) VALUES
(14, 'Chicken Tikka Masala','Pollo en salsa de tomate cremosa con especias punjabi.',           179.00, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe', TRUE),
(14, 'Biryani de Cordero',  'Arroz basmati con cordero especiado, azafrán y frutos secos.',    199.00, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8', TRUE),
(14, 'Palak Paneer',        'Queso fresco en salsa de espinacas con ghee y especias.',          159.00, 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7', TRUE),
(14, 'Naan con Ajo',        'Pan indio horneado en horno tandoor con mantequilla y ajo.',        59.00, 'https://images.unsplash.com/photo-1619894991209-9f9694be45a1', TRUE),
(14, 'Mango Lassi',         'Bebida refrescante de yogurt con mango, cardamomo y miel.',         69.00, 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d', TRUE);

-- ---- Restaurante 15: Dulce Tentación ----
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, available) VALUES
(15, 'Cheesecake de Frutos Rojos','Base de galleta, crema de queso suave y coulis de zarzamora.',  119.00, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587', TRUE),
(15, 'Brownie Doble Choc',  'Brownie fudge de chocolate oscuro con nuez y ganache.',             89.00, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c', TRUE),
(15, 'Pastel Tres Leches',  'Bizcocho empapado en tres leches con crema batida y fresa.',        99.00, 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3', TRUE),
(15, 'Helado Artesanal x2', 'Dos bolas a elegir entre 12 sabores únicos del día.',               79.00, 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a', TRUE),
(15, 'Churros con Cajeta',  'Churros recién hechos con cajeta de cabra y chocolate caliente.',   75.00, 'https://images.unsplash.com/photo-1541533848490-bc8115cd6522', TRUE);