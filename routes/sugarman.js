const Router = require('koa-router');
const route = new Router();
var sequelize = require('../models').sequelize; // mysql 시퀄라이저 모델
const { Op } = require("sequelize");

// const { linkPreview } = require(`link-preview-node`);

const {
  sugarContent
} = require('../models');



route.get('/test', async (ctx, next) => {
	var result = await sugarContent.findAll()

	for(var idx = 0;idx<result.length;idx++){


		var instantIdx = result[idx].idx;
		console.log(instantIdx);

	// await linkPreview(result[idx].url).then(data =>{
	// 		sugarContent.update({
	// 			title: data.title,
	// 			description:data.description,
	// 			img:data.image,

	// 		}, {where: {idx:instantIdx}})  .catch(err => {
	// 			console.error(err);
	// 	 });
	 

	// 	}).catch(catchErr => {
  //       console.log(catchErr);
  //   });

	}
	
	ctx.body = { result:'success',code:'200' };
	
});


route.get('/contents/:type/:pageNum', async (ctx, next) => {
	var pageNum = 0;
	if(!isNaN(ctx.params.pageNum)) {
		pageNum = ctx.params.pageNum;
	}
	
	var result = await sugarContent.findAll({
		where: {
			img: {
				[Op.ne]: ['']
			}
		},
		offset: parseInt(pageNum),
		limit: 3,
  })

	ctx.body = result;	
});

module.exports = route;