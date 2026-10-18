import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Booking from '../models/Booking.js';
const router=Router();
function adminOnly(req,res,next){
  const token=(req.headers.authorization||'').replace(/^Bearer\s+/i,'');
  if(!token)return res.status(401).json({message:'Admin token required'});
  try{const payload=jwt.verify(token,process.env.JWT_SECRET);if(payload.role!=='admin')throw new Error();req.admin=payload;next();}
  catch{return res.status(401).json({message:'Invalid or expired token'});}
}
router.post('/',async(req,res)=>{
  try{
    const {name,phone,crop,area='',message=''}=req.body||{};
    if(!name||!phone||!crop)return res.status(400).json({message:'Name, phone and crop are required'});
    const booking=await Booking.create({name,phone,crop,area,message});
    res.status(201).json({message:'Booking request saved',booking});
  }catch(e){res.status(400).json({message:e.message||'Could not save booking'});}
});
router.get('/',adminOnly,async(_req,res)=>{
  try{res.json(await Booking.find().sort({createdAt:-1}).limit(500));}
  catch{res.status(500).json({message:'Could not load bookings'});}
});
router.patch('/:id/status',adminOnly,async(req,res)=>{
  try{
    const allowed=['New','Contacted','Completed','Cancelled'];
    if(!allowed.includes(req.body.status))return res.status(400).json({message:'Invalid status'});
    const booking=await Booking.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true,runValidators:true});
    if(!booking)return res.status(404).json({message:'Booking not found'});
    res.json(booking);
  }catch{res.status(400).json({message:'Could not update booking'});}
});
export default router;
