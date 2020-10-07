/*
*   put all global variables
*   inside GLOBAL object
*/

var GLOBAL = {
    host: 'http://evaluate.darc.loc:8000',
    socket : 'http:socket',
    set_url : function (ids) {
		
		var q_string = '';
		
		for (var key in ids) {
			var _id = '';
			if (ids[key]) {
				_id = '/' + ids[key];
			}
			var new_key = '/' + key + _id;
			var new_str = q_string + new_key;
			q_string 	= new_str;
		}; 
		
		return this.host + q_string;
	
	},
	header : function (token) {
		
		if (token) {
			return {
				'x-access-token' : token
			};
		} else {
			return false;
		}

	},
	transform : function (file) {
	
		if (file) 
			return angular.identity;
		else
			return false;
	
	},
	user : function (cookies, state, stateName) {
		var user = cookies.getObject('user');
		if (user) {
			return user; 
		} else if (stateName === 'client' || stateName === 'cst' ) {
			
		} else {
			state.go('login');
		}
	},
	parameters : function (params) {
		
		if (params) 
			return params;
		else
			return false;
	
	},
	clean_data : function (data) {
		
		if (!data) 
			return false;
		else
			return data;
	
	},
	clean_object : function (object) {
		
		for(var key in object) {
			if (!object[key]) {
				delete object[key];
			}
		};
		
		return object;
	},
	check_file : function (data, callback) {
		var fd = new FormData();
		if (data.photo || data.license || data.police_clearance || 
			data.accounts || data.nbi_clearance || data.vehicle_photo || 
			data.zones || data.couriers || data.barangays || 
			data.vehicles || data.logo || data.criticalArea || 
			data.bookings || data.file ) {
			for (var key in data) {
				fd.append(key, data[key]);
			};
			callback(fd, true);
		} else {
			callback(data, false);
		}
	},
	user_types : [
		{
			name : 'Administrator',
			value : 'admin'
		},
		{
			name : 'Physician',
			value : 'physician'
		},
		{
			name : 'Radiologist',
			value : 'radiologist'
		}
	],

	ingredients : [
		{
			category: 'Chocolates & Candies',
			sku: '1 x 300 pcs',
			name: 'Menthos Candy',
			specification: '3g/pc',
			shelf_life: 6,
			shelf_life_unit: 'months',
			threshold: 0
		},
		{
			category: 'Chocolates & Candies',
			sku: '1 x 12 rolls',
			name: 'Polo Mint',
			specification: '12g/roll',
			shelf_life: 6,
			shelf_life_unit: 'months',
			threshold: 0
		},
		{
			category: 'Chocolates & Candies',
			sku: '1 x 3 bags x 100 pcs',
			name: 'Starr Hard Candies',
			specification: '10 pcs',
			shelf_life: 6,
			shelf_life_unit: 'months',
			threshold: 0
		},
		{
			category: 'Chocolates & Candies',
			sku: '1 x 6 bags x 70 pcs',
			name: 'XO Coffee Flavor',
			specification: '4.5g/pc',
			shelf_life: 6,
			shelf_life_unit: 'months',
			threshold: 0
		},
		{
			category: 'Condiments & Sauces',
			sku: '1 x 24 packs',
			name: 'Afritada Mix',
			specification: '50g/pack',
			shelf_life: 6,
			shelf_life_unit: 'months',
			threshold: 0
		},
		{
			category: 'Condiments & Sauces',
			sku: '1 x 24 packs',
			name: 'Menudo Mix',
			specification: '50g/pack',
			shelf_life: 6,
			shelf_life_unit: 'months',
			threshold: 0
		},
		{
			category: 'Condiments & Sauces',
			sku: '1 x 6 packs',
			name: 'Broth/Stock (Chicken/Pork/Beef/Tamarind)',
			specification: '1kg/pack',
			shelf_life: 1,
			shelf_life_unit: 'year',
			threshold: 0
		},
		{
			category: 'Condiments & Sauces',
			sku: '1 x 8 packs',
			name: 'Broth/Stock (Chicken/Pork/Beef/Tamarind)',
			specification: '1kg/pack',
			shelf_life: 1,
			shelf_life_unit: 'year',
			threshold: 0
		},
		{
			category: 'Condiments & Sauces',
			sku: '1 x 10 packs',
			name: 'Broth/Stock (Chicken/Pork/Beef/Tamarind)',
			specification: '1kg/pack',
			shelf_life: 1,
			shelf_life_unit: 'year',
			threshold: 0
		},
		{
			category: 'Condiments & Sauces',
			sku: '1 x 1 pack',
			name: 'Bread Crumbs (Japanese/Ordinary)',
			specification: '1kg/pack',
			shelf_life: 3,
			shelf_life_unit: 'months',
			threshold: 0
		}
	],
	recipes : [
		{
			store: 'UPSI Property Holdings, Inc.',
			name: 'Grilled Chicken with Herbs',
			pax: 35,
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity: 4,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Aromat',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Pepper White',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Pepper Black',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Paprika',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Basil Dried Leaves',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Rosemary',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Thymes',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Garlic',
					quantity: 50,
					unit: 'g'
				},
				{
					name: 'Canola Oil',
					quantity: 400,
					unit: 'mL'
				}
			]
			
		},
		{
			store: 'UPSI Property Holdings, Inc.',
			name: 'Chicken with Artichokes',
			pax: 12,
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity: 4,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Aromat',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Pepper White',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Pepper Black',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Paprika',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Basil Dried Leaves',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Rosemary',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Thymes',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Garlic',
					quantity: 50,
					unit: 'g'
				},
				{
					name: 'Canola Oil',
					quantity: 400,
					unit: 'mL'
				}
			]
			
		},
		{
			store: 'UPSI Property Holdings, Inc.',
			name: 'Crockpot Lasagna',
			pax: 25,
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity: 4,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Aromat',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Pepper White',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Pepper Black',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Paprika',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Basil Dried Leaves',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Rosemary',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Thymes',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Garlic',
					quantity: 50,
					unit: 'g'
				},
				{
					name: 'Canola Oil',
					quantity: 400,
					unit: 'mL'
				}
			]
			
		},
		{
			store: 'UPSI Property Holdings, Inc.',
			name: 'Buffalo Chicken Drumsticks with Blue Cheese Dip',
			pax: 10,
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity: 4,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Aromat',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Pepper White',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Pepper Black',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Paprika',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Basil Dried Leaves',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Rosemary',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Thymes',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Garlic',
					quantity: 50,
					unit: 'g'
				},
				{
					name: 'Canola Oil',
					quantity: 400,
					unit: 'mL'
				}
			]
			
		},
		{
			store: 'UPSI Property Holdings, Inc.',
			name: 'Triple Dipped Fried Chicken',
			pax: 30,
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity: 4,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Aromat',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Pepper White',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Pepper Black',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Paprika',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Basil Dried Leaves',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Rosemary',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Thymes',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Garlic',
					quantity: 50,
					unit: 'g'
				},
				{
					name: 'Canola Oil',
					quantity: 400,
					unit: 'mL'
				}
			]
			
		},
		{
			store: 'UPSI Property Holdings, Inc.',
			name: 'Caramelized Backed Chicken',
			pax: 6,
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity: 4,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Aromat',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Pepper White',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Pepper Black',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Paprika',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Basil Dried Leaves',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Rosemary',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Thymes',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Garlic',
					quantity: 50,
					unit: 'g'
				},
				{
					name: 'Canola Oil',
					quantity: 400,
					unit: 'mL'
				}
			]
			
		},
		{
			store: 'UPSI Property Holdings, Inc.',
			name: 'Sausage, Potato, and Kale Soup',
			pax: 10,
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity: 4,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Aromat',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Pepper White',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Pepper Black',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Paprika',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Basil Dried Leaves',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Rosemary',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Thymes',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Garlic',
					quantity: 50,
					unit: 'g'
				},
				{
					name: 'Canola Oil',
					quantity: 400,
					unit: 'mL'
				}
			]
			
		},
		{
			store: 'UPSI Property Holdings, Inc.',
			name: 'Creme Brulee French Toast',
			pax: 8,
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity: 4,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Aromat',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Pepper White',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Pepper Black',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Paprika',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Basil Dried Leaves',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Rosemary',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Thymes',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Garlic',
					quantity: 50,
					unit: 'g'
				},
				{
					name: 'Canola Oil',
					quantity: 400,
					unit: 'mL'
				}
			]
			
		},
		{
			store: 'UPSI Property Holdings, Inc.',
			name: 'Burrito Pie',
			pax: 12,
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity: 4,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Aromat',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Pepper White',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Pepper Black',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Paprika',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Basil Dried Leaves',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Rosemary',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Thymes',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Garlic',
					quantity: 50,
					unit: 'g'
				},
				{
					name: 'Canola Oil',
					quantity: 400,
					unit: 'mL'
				}
			]
			
		},
		{
			store: 'UPSI Property Holdings, Inc.',
			name: 'Chicken Enchiladas',
			pax: 30,
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity: 4,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity: 100,
					unit: 'mL'
				},
				{
					name: 'Aromat',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Pepper White',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Pepper Black',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Paprika',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Basil Dried Leaves',
					quantity: 5,
					unit: 'g'
				},
				{
					name: 'Rosemary',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Thymes',
					quantity: 10,
					unit: 'g'
				},
				{
					name: 'Garlic',
					quantity: 50,
					unit: 'g'
				},
				{
					name: 'Canola Oil',
					quantity: 400,
					unit: 'mL'
				}
			]
		}
	],
	requests: [
		{
			created: '21-Jan-2017',
			date_delivery: '24-Jan-2017',
			id: 'RO-20170121-0003',
			status: 'pending',
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity: 16,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity: 400,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity: 400,
					unit: 'mL'
				},
				{
					name: 'Canola Oil',
					quantity: 1600,
					unit: 'mL'
				}
			]
		},
		{
			created: '21-Jan-2017',
			date_delivery: '24-Jan-2017',
			id: 'RO-20170121-0014',
			status: 'declined',
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity: 16,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity: 400,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity: 400,
					unit: 'mL'
				},
				{
					name: 'Canola Oil',
					quantity: 1600,
					unit: 'mL'
				}
			]
		},
		{
			created: '22-Jan-2017',
			date_delivery: '25-Jan-2017',
			id: 'RO-20170122-0001',
			status: 'for-purchasing',
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity: 16,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity: 400,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity: 400,
					unit: 'mL'
				},
				{
					name: 'Canola Oil',
					quantity: 1600,
					unit: 'mL'
				}
			]
		},
		{
			created: '22-Jan-2017',
			date_delivery: '25-Jan-2017',
			id: 'RO-20170122-0002',
			status: 'for-purchasing',
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity: 16,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity: 400,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity: 400,
					unit: 'mL'
				},
				{
					name: 'Canola Oil',
					quantity: 1600,
					unit: 'mL'
				}
			]
		}
	],
	purchases: [
		{
			created: new Date('21-Jan-2017'),
			date_delivery: new Date('24-Jan-2017'),
			id: 'PO-20170121-0003',
			status: 'for delivery',
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity: 16,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity: 400,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity: 400,
					unit: 'mL'
				},
				{
					name: 'Canola Oil',
					quantity: 1600,
					unit: 'mL'
				}
			]
		},
		{
			created: new Date('21-Jan-2017'),
			date_delivery: new Date('24-Jan-2017'),
			id: 'PO-20170121-0014',
			status: 'for delivery',
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity: 16,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity: 400,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity: 400,
					unit: 'mL'
				},
				{
					name: 'Canola Oil',
					quantity: 1600,
					unit: 'mL'
				}
			]
		},
		{
			created: new Date('22-Jan-2017'),
			date_delivery: new Date('25-Jan-2017'),
			id: 'PO-20170122-0001',
			status: 'delivered',
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity: 16,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity: 400,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity: 400,
					unit: 'mL'
				},
				{
					name: 'Canola Oil',
					quantity: 1600,
					unit: 'mL'
				}
			]
		},
		{
			created: new Date('22-Jan-2017'),
			date_delivery: new Date('25-Jan-2017'),
			id: 'PO-20170122-0002',
			status: 'delivered',
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity: 16,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity: 400,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity: 400,
					unit: 'mL'
				},
				{
					name: 'Canola Oil',
					quantity: 1600,
					unit: 'mL'
				}
			]
		}
	],
	inventory : [
		{
			category: 'Chocolates & Candies',
			sku: '1 x 300 pcs',
			name: 'Menthos Candy',
			quantity: 400,
			weighted_price: 24.35,
			flows: [
				{
					date: '04-Jan-2017',
					supplier: 'Benby Enterprises, Inc.',
					store: null,
					quantity: 800,
					unit_price: 23.68
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -250,
					unit_price: null
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -150,
					unit_price: null
				}
			]
		},
		{
			category: 'Chocolates & Candies',
			sku: '1 x 12 rolls',
			name: 'Polo Mint',
			quantity: 320,
			weighted_price: 27.20,
			flows: [
				{
					date: '04-Jan-2017',
					supplier: 'Benby Enterprises, Inc.',
					store: null,
					quantity: 800,
					unit_price: 23.68
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -250,
					unit_price: null
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -150,
					unit_price: null
				}
			]
		},
		{
			category: 'Chocolates & Candies',
			sku: '1 x 3 bags x 100 pcs',
			name: 'Starr Hard Candies',
			quantity: 418,
			weighted_price: 26.12,
			flows: [
				{
					date: '04-Jan-2017',
					supplier: 'Benby Enterprises, Inc.',
					store: null,
					quantity: 800,
					unit_price: 23.68
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -250,
					unit_price: null
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -150,
					unit_price: null
				}
			]
		},
		{
			category: 'Chocolates & Candies',
			sku: '1 x 6 bags x 70 pcs',
			name: 'XO Coffee Flavor',
			quantity: 270,
			weighted_price: 48.16,
			flows: [
				{
					date: '04-Jan-2017',
					supplier: 'Benby Enterprises, Inc.',
					store: null,
					quantity: 800,
					unit_price: 23.68
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -250,
					unit_price: null
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -150,
					unit_price: null
				}
			]
		},
		{
			category: 'Condiments & Sauces',
			sku: '1 x 24 packs',
			name: 'Afritada Mix',
			quantity: 115,
			weighted_price: 225.50,
			flows: [
				{
					date: '04-Jan-2017',
					supplier: 'Benby Enterprises, Inc.',
					store: null,
					quantity: 800,
					unit_price: 23.68
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -250,
					unit_price: null
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -150,
					unit_price: null
				}
			]
		},
		{
			category: 'Condiments & Sauces',
			sku: '1 x 24 packs',
			name: 'Menudo Mix',
			quantity: 126,
			weighted_price: 225.35,
			flows: [
				{
					date: '04-Jan-2017',
					supplier: 'Benby Enterprises, Inc.',
					store: null,
					quantity: 800,
					unit_price: 23.68
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -250,
					unit_price: null
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -150,
					unit_price: null
				}
			]
		},
		{
			category: 'Condiments & Sauces',
			sku: '1 x 6 packs',
			name: 'Broth/Stock (Chicken/Pork/Beef/Tamarind)',
			quantity: 119,
			weighted_price: 70.96,
			flows: [
				{
					date: '04-Jan-2017',
					supplier: 'Benby Enterprises, Inc.',
					store: null,
					quantity: 800,
					unit_price: 23.68
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -250,
					unit_price: null
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -150,
					unit_price: null
				}
			]
		},
		{
			category: 'Condiments & Sauces',
			sku: '1 x 8 packs',
			name: 'Broth/Stock (Chicken/Pork/Beef/Tamarind)',
			quantity: 104,
			weighted_price: 70.96,
			flows: [
				{
					date: '04-Jan-2017',
					supplier: 'Benby Enterprises, Inc.',
					store: null,
					quantity: 800,
					unit_price: 23.68
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -250,
					unit_price: null
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -150,
					unit_price: null
				}
			]
		},
		{
			category: 'Condiments & Sauces',
			sku: '1 x 10 packs',
			name: 'Broth/Stock (Chicken/Pork/Beef/Tamarind)',
			quantity: 115,
			weighted_price: 70.96,
			flows: [
				{
					date: '04-Jan-2017',
					supplier: 'Benby Enterprises, Inc.',
					store: null,
					quantity: 800,
					unit_price: 23.68
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -250,
					unit_price: null
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -150,
					unit_price: null
				}
			]
		},
		{
			category: 'Condiments & Sauces',
			sku: '1 x 1 pack',
			name: 'Bread Crumbs (Japanese/Ordinary)',
			quantity: 80,
			weighted_price: 16.75,
			flows: [
				{
					date: '04-Jan-2017',
					supplier: 'Benby Enterprises, Inc.',
					store: null,
					quantity: 800,
					unit_price: 23.68
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -250,
					unit_price: null
				},
				{
					date: '07-Jan-2017',
					supplier: null,
					store: 'UPSI Property Holdings, Inc.',
					quantity: -150,
					unit_price: null
				}
			]
		}
	],
	requisitions: [
		{
			created: '19-Jan-2017',
			id: 'RX-20170121-0014',
			status: 'unserved',
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity_requested: 16,
					quantity_delivered: 0,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity_requested: 400,
					quantity_delivered: 0,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity_requested: 400,
					quantity_delivered: 0,
					unit: 'mL'
				},
				{
					name: 'Canola Oil',
					quantity_requested: 1600,
					quantity_delivered: 0,
					unit: 'mL'
				}
			]
		},
		{
			created: '20-Jan-2017',
			date_delivery: '24-Jan-2017',
			id: 'RX-20170121-0063',
			status: 'partially served',
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity_requested: 16,
					quantity_delivered: 16,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity_requested: 400,
					quantity_delivered: 200,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity_requested: 400,
					quantity_delivered: 400,
					unit: 'mL'
				},
				{
					name: 'Canola Oil',
					quantity_requested: 1600,
					quantity_delivered: 0,
					unit: 'mL'
				}
			]
		},
		{
			created: '22-Jan-2017',
			date_delivery: '25-Jan-2017',
			id: 'RX-20170122-0078',
			status: 'completely served',
			ingredients: [
				{
					name: 'Chicken Fillet',
					quantity_requested: 16,
					quantity_delivered: 16,
					unit: 'kg'
				},
				{
					name: 'Puree (Calamansi)',
					quantity_requested: 400,
					quantity_delivered: 400,
					unit: 'mL'
				},
				{
					name: 'Knorr Seasoning',
					quantity_requested: 400,
					quantity_delivered: 400,
					unit: 'mL'
				},
				{
					name: 'Canola Oil',
					quantity_requested: 1600,
					quantity_delivered: 1600,
					unit: 'mL'
				}
			]
		}
	],
	productions: [
		{
			id: 'PR-20170121-0049',
			date: '21-Jan-2017',
			recipe: 'Grilled Chicken with Herbs',
			pax: 12
		},
		{
			id: 'PR-20170121-0050',
			date: '21-Jan-2017',
			recipe: 'Chicken with Artichokes',
			pax: 25
		},
		{
			id: 'PR-20170121-0051',
			date: '21-Jan-2017',
			recipe: 'Crockpot Lasagna',
			pax: 10
		},
		{
			id: 'PR-20170121-0052',
			date: '21-Jan-2017',
			recipe: 'Buffalo Chicken Drumsticks with Blue Cheese Dip',
			pax: 30
		},
		{
			id: 'PR-20170121-0053',
			date: '21-Jan-2017',
			recipe: 'Triple Dipped Fried Chicken',
			pax: 6
		},
		{
			id: 'PR-20170121-0054',
			date: '21-Jan-2017',
			recipe: 'Caramelized Backed Chicken',
			pax: 10
		},
		{
			id: 'PR-20170121-0055',
			date: '21-Jan-2017',
			recipe: 'Sausage, Potato, and Kale Soup',
			pax: 8
		},
		{
			id: 'PR-20170121-0056',
			date: '21-Jan-2017',
			recipe: 'Creme Brulee French Toast',
			pax: 12
		},
		{
			id: 'PR-20170121-0048',
			date: '21-Jan-2017',
			recipe: 'Burrito Pie',
			pax: 35
		},
		{
			id: 'PR-20170121-0057',
			date: '21-Jan-2017',
			recipe: 'Chicken Enchiladas',
			pax: 30
		}
	],
	requisition_deliveries : [
		{
			date: '21-Jan-2017',
			sku: '1 x 300 pcs',
			name: 'Menthos Candy',
			quantity: 400
		},
		{
			date: '21-Jan-2017',
			sku: '1 x 12 rolls',
			name: 'Polo Mint',
			quantity: 320
		},
		{
			date: '21-Jan-2017',
			sku: '1 x 3 bags x 100 pcs',
			name: 'Starr Hard Candies',
			quantity: 418
		},
		{
			date: '21-Jan-2017',
			sku: '1 x 6 bags x 70 pcs',
			name: 'XO Coffee Flavor',
			quantity: 270
		},
		{
			date: '21-Jan-2017',
			sku: '1 x 24 packs',
			name: 'Afritada Mix',
			quantity: 115
		},
		{
			date: '21-Jan-2017',
			sku: '1 x 24 packs',
			name: 'Menudo Mix',
			quantity: 126
		},
		{
			date: '21-Jan-2017',
			sku: '1 x 6 packs',
			name: 'Broth/Stock (Chicken/Pork/Beef/Tamarind)',
			quantity: 119
		},
		{
			date: '21-Jan-2017',
			sku: '1 x 8 packs',
			name: 'Broth/Stock (Chicken/Pork/Beef/Tamarind)',
			quantity: 104
		},
		{
			date: '21-Jan-2017',
			sku: '1 x 10 packs',
			name: 'Broth/Stock (Chicken/Pork/Beef/Tamarind)',
			quantity: 115
		},
		{
			date: '21-Jan-2017',
			sku: '1 x 1 pack',
			name: 'Bread Crumbs (Japanese/Ordinary)',
			quantity: 80
		}
	],  
	supplier_deliveries : [
		{
			date: '21-Jan-2017',
			supplier: 'Benby Enterprises, Inc.',
			sku: '1 x 300 pcs',
			name: 'Menthos Candy',
			quantity: 400,
			unit_price: 24.35
		},
		{
			date: '21-Jan-2017',
			supplier: 'Benby Enterprises, Inc.',
			sku: '1 x 12 rolls',
			name: 'Polo Mint',
			quantity: 320,
			unit_price: 27.20
		},
		{
			date: '21-Jan-2017',
			supplier: 'Benby Enterprises, Inc.',
			sku: '1 x 3 bags x 100 pcs',
			name: 'Starr Hard Candies',
			quantity: 418,
			unit_price: 26.12
		},
		{
			date: '21-Jan-2017',
			supplier: 'Benby Enterprises, Inc.',
			sku: '1 x 6 bags x 70 pcs',
			name: 'XO Coffee Flavor',
			quantity: 270,
			unit_price: 48.16
		},
		{
			date: '21-Jan-2017',
			supplier: 'ACS Manufacturing, Inc.',
			sku: '1 x 24 packs',
			name: 'Afritada Mix',
			quantity: 115,
			unit_price: 225.50
		},
		{
			date: '21-Jan-2017',
			supplier: 'ACS Manufacturing, Inc.',
			sku: '1 x 24 packs',
			name: 'Menudo Mix',
			quantity: 126,
			unit_price: 225.35
		},
		{
			date: '21-Jan-2017',
			supplier: 'ACS Manufacturing, Inc.',
			sku: '1 x 6 packs',
			name: 'Broth/Stock (Chicken/Pork/Beef/Tamarind)',
			quantity: 119,
			unit_price: 70.96
		},
		{
			date: '21-Jan-2017',
			supplier: 'ACS Manufacturing, Inc.',
			sku: '1 x 8 packs',
			name: 'Broth/Stock (Chicken/Pork/Beef/Tamarind)',
			quantity: 104,
			unit_price: 70.96
		},
		{
			date: '21-Jan-2017',
			supplier: 'ACS Manufacturing, Inc.',
			sku: '1 x 10 packs',
			name: 'Broth/Stock (Chicken/Pork/Beef/Tamarind)',
			quantity: 115,
			unit_price: 70.96
		},
		{
			date: '21-Jan-2017',
			supplier: 'ACS Manufacturing, Inc.',
			sku: '1 x 1 pack',
			name: 'Bread Crumbs (Japanese/Ordinary)',
			quantity: 80,
			unit_price: 16.75
		}
	],
	store_inventory : [
		{
			category: 'Chocolates & Candies',
			sku: '1 x 300 pcs',
			name: 'Menthos Candy',
			quantity: 400,
			weighted_price: 24.35,
			flows: [
				{
					date: '04-Jan-2017',
					requisition: 'RX-20170122-0078',
					production: null,
					quantity: 800
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0057',
					quantity: -250
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0058',
					quantity: -150,
				}
			]
		},
		{
			category: 'Chocolates & Candies',
			sku: '1 x 12 rolls',
			name: 'Polo Mint',
			quantity: 320,
			weighted_price: 27.20,
			flows: [
				{
					date: '04-Jan-2017',
					requisition: 'RX-20170122-0078',
					production: null,
					quantity: 800
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0057',
					quantity: -250
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0058',
					quantity: -150,
				}
			]
		},
		{
			category: 'Chocolates & Candies',
			sku: '1 x 3 bags x 100 pcs',
			name: 'Starr Hard Candies',
			quantity: 418,
			weighted_price: 26.12,
			flows: [
				{
					date: '04-Jan-2017',
					requisition: 'RX-20170122-0078',
					production: null,
					quantity: 800
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0057',
					quantity: -250
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0058',
					quantity: -150,
				}
			]
		},
		{
			category: 'Chocolates & Candies',
			sku: '1 x 6 bags x 70 pcs',
			name: 'XO Coffee Flavor',
			quantity: 270,
			weighted_price: 48.16,
			flows: [
				{
					date: '04-Jan-2017',
					requisition: 'RX-20170122-0078',
					production: null,
					quantity: 800
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0057',
					quantity: -250
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0058',
					quantity: -150,
				}
			]
		},
		{
			category: 'Condiments & Sauces',
			sku: '1 x 24 packs',
			name: 'Afritada Mix',
			quantity: 115,
			weighted_price: 225.50,
			flows: [
				{
					date: '04-Jan-2017',
					requisition: 'RX-20170122-0078',
					production: null,
					quantity: 800
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0057',
					quantity: -250
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0058',
					quantity: -150,
				}
			]
		},
		{
			category: 'Condiments & Sauces',
			sku: '1 x 24 packs',
			name: 'Menudo Mix',
			quantity: 126,
			weighted_price: 225.35,
			flows: [
				{
					date: '04-Jan-2017',
					requisition: 'RX-20170122-0078',
					production: null,
					quantity: 800
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0057',
					quantity: -250
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0058',
					quantity: -150,
				}
			]
		},
		{
			category: 'Condiments & Sauces',
			sku: '1 x 6 packs',
			name: 'Broth/Stock (Chicken/Pork/Beef/Tamarind)',
			quantity: 119,
			weighted_price: 70.96,
			flows: [
				{
					date: '04-Jan-2017',
					requisition: 'RX-20170122-0078',
					production: null,
					quantity: 800
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0057',
					quantity: -250
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0058',
					quantity: -150,
				}
			]
		},
		{
			category: 'Condiments & Sauces',
			sku: '1 x 8 packs',
			name: 'Broth/Stock (Chicken/Pork/Beef/Tamarind)',
			quantity: 104,
			weighted_price: 70.96,
			flows: [
				{
					date: '04-Jan-2017',
					requisition: 'RX-20170122-0078',
					production: null,
					quantity: 800
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0057',
					quantity: -250
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0058',
					quantity: -150,
				}
			]
		},
		{
			category: 'Condiments & Sauces',
			sku: '1 x 10 packs',
			name: 'Broth/Stock (Chicken/Pork/Beef/Tamarind)',
			quantity: 115,
			weighted_price: 70.96,
			flows: [
				{
					date: '04-Jan-2017',
					requisition: 'RX-20170122-0078',
					production: null,
					quantity: 800
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0057',
					quantity: -250
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0058',
					quantity: -150,
				}
			]
		},
		{
			category: 'Condiments & Sauces',
			sku: '1 x 1 pack',
			name: 'Bread Crumbs (Japanese/Ordinary)',
			quantity: 80,
			weighted_price: 16.75,
			flows: [
				{
					date: '04-Jan-2017',
					requisition: 'RX-20170122-0078',
					production: null,
					quantity: 800
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0057',
					quantity: -250
				},
				{
					date: '07-Jan-2017',
					requisition: null,
					production: 'PR-20170107-0058',
					quantity: -150,
				}
			]
		}
	],
	critical_levels: [
		{
			name: 'Bread Crumbs (Japanese/Ordinary)',
			sku: '1 x 1 pack',
			stock: 85,
			order: 10,
			threshold: 100
		},
		{
			name: 'Broth/Stock (Chicken/Pork/Beef/Tamarind)',
			sku: '1 x 8 packs',
			stock: 117,
			order: 20,
			threshold: 120
		},
		{
			name: 'Broth/Stock (Chicken/Pork/Beef/Tamarind)',
			sku: '1 x 10 packs',
			stock: 98,
			order: 15,
			threshold: 120
		},
		{
			name: 'Starr Hard Candies',
			sku: '1 x 3 bags x 100 pcs',
			stock: 436,
			order: 100,
			threshold: 500
		},
		{
			name: 'XO Coffee Flavor',
			sku: '1 x 6 bags x 70 pcs',
			stock: 485,
			order: 200,
			threshold: 500
		}
	],
	top_recipes: [
		{
			name: 'Burrito Pie'
		},
		{
			name: 'Grilled Chicken with Herbs'
		}
		,
		{
			name: 'Chicken Enchiladas'
		}
		,
		{
			name: 'Sausage, Potato, and Kale Soup'
		}
		,
		{
			name: 'Buffalo Chicken Drumsticks with Blue Cheese Dip'
		}
	],
	price_changes: [
		{
			name: 'Menu Mix',
			price_old: 24.35,
			price_new: 25.40
		},
		{
			name: 'Polo Mint',
			price_old: 27.20,
			price_new: 27.18
		},
		{
			name: 'Afritada Mix',
			price_old: 26.12,
			price_new: 31.05
		},
		{
			name: 'Menthos Candy',
			price_old: 48.16,
			price_new: 48.25
		},
		{
			name: 'XO Coffee Flavor',
			price_old: 70.96,
			price_new: 68.85
		},
	],
	suppliers: [
		{
			id: 1,
			name: "Benby Enterprises, Inc."
		},
		{
			id: 2,
			name: "ACS Manufacturing, Inc."
		},
		{
			id: 3,
			name: "ABC Manufacturing, Inc."
		}
	]
};