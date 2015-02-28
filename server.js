var express = require('express');
var bodyParser = require('body-parser');

var Sequelize = require('sequelize')
  , sequelize = new Sequelize('test_aaa', 'root', '10181018', {
      dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
      port:    3306, // or 5432 (for postgres)   
    });



	
var Product = sequelize.define('Product', {
  itemn: {type : Sequelize.STRING, primaryKey : true, unique : true},
  name: Sequelize.STRING,
  name1: Sequelize.STRING,
  mspitemn: Sequelize.STRING,
  unit: Sequelize.STRING,
  pack: Sequelize.STRING,
  msp: Sequelize.STRING,
  price: Sequelize.STRING,
  price1: Sequelize.STRING,
  tax: Sequelize.STRING,
  cost: Sequelize.STRING,
}, {
	tableName:"ppname",
    timestamps: false
});



var Client = sequelize.define('Client', {
  itemn: {type : Sequelize.STRING, primaryKey : true, unique : true},
  item: Sequelize.STRING,
  item1: Sequelize.STRING,
  itemt: Sequelize.STRING,
  itemh: Sequelize.STRING,
  tel: Sequelize.STRING,
  tel1: Sequelize.STRING,
  telh: Sequelize.STRING,
  addr: Sequelize.STRING,
  add1: Sequelize.STRING,
  name1: Sequelize.STRING,
  name2: Sequelize.STRING,
  name3: Sequelize.STRING, 
  fax: Sequelize.STRING,
  addrt: Sequelize.STRING,
  addrh: Sequelize.STRING,
  pttype: Sequelize.STRING,
  ptmach: Sequelize.STRING,
  plac: Sequelize.STRING,
  money: Sequelize.STRING,
  money1: Sequelize.STRING,
  
  
  
}, {
	tableName:"pppname1",
    timestamps: false
});

var Supplier = sequelize.define('Supplier', {
  itemn: {type : Sequelize.STRING, primaryKey : true, unique : true},
  item: Sequelize.STRING,
  item1: Sequelize.STRING,
 
  tel: Sequelize.STRING,
 
  addr: Sequelize.STRING,
  add1: Sequelize.STRING,
  name: Sequelize.STRING,
 
  fax: Sequelize.STRING,
  itemx: Sequelize.STRING,
  
  
  
}, {
	tableName:"pppname",
    timestamps: false
});

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var count =0;

app.use(express.static(__dirname + '/public'));

app.get('/ppname', function(req, res){
	console.log("/ppname");
	
	Product.findAll().then(function(data){
		console.log("findAll done");
		console.log("found "+data.length+" items");
		res.json(data);
	});
});

app.get("/test", function(request, response){
	// 資料庫查詢完執行
	function whenFinish(error, result) {
		if (error) {
			response.json({status:false,msg:"not found"});
		} else {
			response.json(result);
		}
	}
	// 查詢資料庫
	var name="cs";
	Client.findAll({
		where: ["itemn like ?","%"+name+"%"]
	}).complete(whenFinish);
	
	
});

// 讀取所有客戶
app.get('/clients', function(request, response){
	Client.findAll().complete(function(error, result){
		response.json(result);
	});
});
// 讀取所有產品
app.get('/products', function(request, response){
	Product.findAll().complete(function(error, result){
		response.json(result);
	});
});
// 讀取所有供應商
app.get('/suppliers', function(request, response){
	console.log("query="+request.query);	// supplier?take=4&skip=5
	console.log("params="+request.params); // /supplier/{take}/{skip}
	console.log("body="+request.body); // post
	Supplier.findAll({
		limit:request.query.take,
		offset:request.query.skip,
	}).complete(function(error, result){
		response.json(result);
	});
});


app.get('/ppname/:itemn', function(req, res){
	console.log("/ppname");	

	Product.find({ where: { itemn: req.params.itemn } })
	  .complete(function(err, item) {
		if (!!err) {
			res.json({status:false,msg:'An error occurred while searching item for '+req.params.itemn});
		} else if (!item) {
		  res.json({status:false,msg:"item not found"});
		} else {
			res.json({status:true,data:item});
		}
	  })
	  
	  
	  
});

app.get('/pppname1', function(req, res){
	console.log("/pppname1");
	
	Supplier.findAll().then(function(data){
		console.log("findAll done");
		console.log("found "+data.length+" items");
		res.json(data);
	});
});
app.get('/pppname1/:itemn', function(req, res){
	console.log("/ppname");
	var query = { where: { itemn: req.params.itemn } };
	Supplier.find()
	  .complete(function(err, item) {
		if (!!err) {
			res.json({status:false,msg:'An error occurred while searching item for '+req.params.itemn});
		} else if (!item) {
		  res.json({status:false,msg:"item not found"});
		} else {
			
			
			res.json({status:true,data:item});
		}
	  })
});


app.get('/pppname', function(req, res){
	console.log("/pppname");
	
	Supplier.findAll().then(function(data){
		console.log("findAll done");
		console.log("found "+data.length+" items");
		res.json(data);
	});
});
app.get('/pppname/:itemn', function(req, res){
	console.log("/pppname");
	
	Supplier.find({ where: { itemn: req.params.itemn } })
	  .complete(function(err, item) {
		if (!!err) {
			res.json({status:false,msg:'An error occurred while searching item for '+req.params.itemn});
		} else if (!item) {
		  res.json({status:false,msg:"item not found"});
		} else {
			res.json({status:true,data:item});
		}
	  })
});

app.get('/pppname1/delete/:itemn', function(req, res){
	console.log("/pppname1");
	Client.find(req.params.itemn).on('success', function(item) {
	  item.destroy().on('success', function(u) {
		if (u && u.deletedAt) {
		  res.json({status:true});
		} else {
			res.json({status:true});
		}
	  })
	})
});

app.get('/pppname/delete/:itemn', function(req, res){
	console.log("/pppname");
	Supplier.find(req.params.itemn).on('success', function(item) {
	  item.destroy().on('success', function(u) {
		if (u && u.deletedAt) {
		  res.json({status:true});
		} else {
			res.json({status:true});
		}
	  })
	})
});

app.get('/ppname/delete/:itemn', function(req, res){
	console.log("/ppname");
	Product.find(req.params.itemn).on('success', function(item) {
	  item.destroy().on('success', function(u) {
		if (u && u.deletedAt) {
		  res.json({status:true});
		} else {
			res.json({status:true});
		}
	  })
	})
});

app.post('/pppname1', function(req, res){
	console.log(req.body);
	var item = Client.build(req.body);
	 
	item
	  .save()
	  .complete(function(err) {
		if (!!err) {
		  res.send('The instance has not been saved:', err)
		} else {
		  res.send('We have a persisted instance now')
		}
	  })
});

app.post('/pppname', function(req, res){
	console.log(req.body);
	var item = Supplier.build(req.body);
	 
	item
	  .save()
	  .complete(function(err) {
		if (!!err) {
		  res.send('The instance has not been saved:', err)
		} else {
		  res.send('We have a persisted instance now')
		}
	  })
});

app.post('/ppname', function(req, res){
	console.log(req.body);
	var item = Product.build(req.body);
	 
	item
	  .save()
	  .complete(function(err) {
		if (!!err) {
		  res.send('The instance has not been saved:', err)
		} else {
		  res.send('We have a persisted instance now')
		}
	  })
});

app.post('/clients/save', function(req, res){
	console.log(req.body);
	var name = req.body.name;
	var addr = req.body.address;
	// save to database
	var client = {name:name, address:addr};
	
		res.send("saved");
	
	
});


	
sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err);
    } else {
      console.log('Connection has been established successfully.');
	  var server = app.listen(3000, function(){
		var host = server.address().address
		var port = server.address().port

		console.log('application listening at http://%s:%s', host, port);
	});
    }
  });

	




