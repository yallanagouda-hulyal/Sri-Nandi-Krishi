import { Router } from 'express';
import jwt from 'jsonwebtoken';
const router=Router();
router.post('/login',(req,res)=>{
  const {email,password}=req.body||{};
  if(!process.env.ADMIN_EMAIL||!process.env.ADMIN_PASSWORD||!process.env.JWT_SECRET)
    return res.status(500).json({message:'Admin credentials are not configured in .env'});
  if(email!==process.env.ADMIN_EMAIL||password!==process.env.ADMIN_PASSWORD)
    return res.status(401).json({message:'Invalid email or password'});
  const token=jwt.sign({role:'admin',email},process.env.JWT_SECRET,{expiresIn:'8h'});
  res.json({token,admin:{email}});
});
export default router;
