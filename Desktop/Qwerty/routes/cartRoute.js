// routes>cartRoute.js

const express = require('express');
const router = express.Router();

// Middleware
const authMiddleware = require('../middlewares/cusAuthMiddleware.js');

// Model
const { Carts, CartMenus } = require('../models/index.js');

const { Op } = require('sequelize');

// 장바구니 상품 생성 API (POST) => CartMenus
router.post('/cart', authMiddleware, async (req, res) => {
  console.log('req.body =>', req.body);
  const { menuId } = req.body;

  try {
    const { userId } = res.locals.user;
    const cart = await Carts.findOne({ where: { userId } });

    const isExistCartItem = await CartMenus.findOne({
      where: { [Op.and]: [{ cartId: cart.cartId }, { menuId: menuId }] },
    });
    if (isExistCartItem) {
      return res.status(201).json({ message: '이미 장바구니에 존재하는 상품입니다.' });
    } else {
      await CartMenus.create({ cartId: cart.cartId, menuId: menuId });
    }

    const cartMenu = await CartMenus.findOne({ where: { menuId: menuId } });
    const menu = await Menus.findOne({ where: { menuId: menuId } });

    const cartMenuTotalPrice = menu.price * cartMenu.quantity;
    const totalPrice = cart.totalPrice + cartMenuTotalPrice;

    await Carts.update({ totalPrice: totalPrice }, { where: { userId } });
    return res.status(201).json({ message: '장바구니에 상품이 성공적으로 담겼습니다.' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: '요청이 정상적으로 처리되지 않았습니다.' });
  }
});

// 장바구니 조회 API (목록조회)
router.get('/cart', authMiddleware, async (req, res) => {  //user/:userId/cart/:cartId
    try{
    const { cartId } = req.params;
    if(!cartId) {
        return res.status(404).json({message: "장바구니가 조회되지 않습니다."})
    }
    const cartMenus = await cartMenus.findAll({
        raw: true, 
        attributes:['quantity'],
        include: [
        {
          Model: Menus, 
          attributes: ['menuName', 'menuImage', 'price']
        }
      ],
        where: { cartId: cartId },
    })
    return res.status(200).json({data: cartMenus});
    }catch(error){
        console.log(error)
        return res.status(400).json({message: "요청이 정상적으로 처리되지 않았습니다."})
    }
})

// 장바구니 수정 API
router.put("/cart/:cardId", authMiddleware, async (req,res) => {
  const {userId} = res.locals.user;
  const {cartId} = req.params
  const { menuId } = req.body;
  try{

    const cart = await Carts.findOne({ where: { cartId:cartId } });
    await CartMenus.update({ cartId: cart.cartId, menuId: parseInt(menuId) });

    return res.status(200).json({message:"장바구니가 수정되었습니다."})
  }catch(error){
    console.log(error)
    return res.status(400).json({errorMessage:"장바구니 수정 과정에 오류가 발생하였습니다."})
  }
})


// 장바구니 삭제 API
router.delete("/cart/:cardId", authMiddleware, async (req,res) => {
  const {userId} = res.locals.user;
  const {cartId} = req.params
  try{
    
    await CartMenus.destroy({where:{cartId:cartId}})
    return res.status(200).json({message:"장바구니 품목이 삭제되었습니다."})
  }catch(error){
    console.log(error)
    return res.status(400).json({errorMessage:"장바구니 삭제 과정에 오류가 발생하였습니다."})
  }
})

module.exports = router;