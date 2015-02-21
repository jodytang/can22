var express = require('express');
var bodyParser = require('body-parser');

var Sequelize = require('sequelize')
  , sequelize = new Sequelize('test_aaa', 'root', '10181018', {
      dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
      port:    3306, // or 5432 (for postgres)
    });



	
var ppname = sequelize.define('ppname', {
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

var pppname1 = sequelize.define('pppname1', {
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

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var count =0;

app.use(express.static(__dirname + '/public'));

app.get('/ppname', function(req, res){
	console.log("/ppname");
	
	ppname.findAll().then(function(data){
		console.log("findAll done");
		console.log("found "+data.length+" items");
		res.json(data);
	});
});
app.get('/ppname/:itemn', function(req, res){
	console.log("/ppname");
	
	ppname.find({ where: { itemn: req.params.itemn } })
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
	
	pppname1.findAll().then(function(data){
		console.log("findAll done");
		console.log("found "+data.length+" items");
		res.json(data);
	});
});
app.get('/pppname1/:itemn', function(req, res){
	console.log("/ppname");
	
	pppname1.find({ where: { itemn: req.params.itemn } })
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
	pppname1.find(req.params.itemn).on('success', function(item) {
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
	ppname.find(req.params.itemn).on('success', function(item) {
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
	var item = pppname1.build(req.body);
	 
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
	var item = ppname.build(req.body);
	 
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

	




