const express = require('express');
const MemberController = require('../controllers/Members/memberController');
const { uploadLocal } = require('../middlewares/multerLocal');

const router = express.Router();

router.post('/member/savemember', 
    uploadLocal.fields([{ name: 'memberPhoto', maxCount: 1 }, { name: 'proofDocument', maxCount: 1 }]), 
    MemberController.saveMember);
router.get('/member/getallmember',  MemberController.getallMember);
router.get('/member/getmemberbyid/:id', MemberController.getMemberById);
router.put('/member/updatemember/:id', 
    uploadLocal.fields([
    { name: 'memberPhoto', maxCount: 1 },
    { name: 'proofDocument', maxCount: 1 }]),
    MemberController.updateMember);
router.delete('/member/deletemember/:id' , MemberController.deleteMember);
router.get('/member/getmemberidandname', MemberController.getMemberIdAndName)
router.get('/members/expired', MemberController.getExpiredMembers);

module.exports = router;
