const express=require('express')
const router=express.Router()

const Company=require('../models/companySchema')


router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/search', async (req, res) => {
    const searchTerm = req.query.q;
    if (!searchTerm) {
        return res.status(400).json({ error: 'Query parameter q is required' });
    }

    try {
        const companies = await Company.find({ party_name: new RegExp(searchTerm, 'i') }).limit(10);
        console.log(companies)
        res.json(companies);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/onload_party_name',async(req,res)=>{
    try {
        const companies = await Company.find({})
        res.json({companies:companies})
    } catch (error) {
        
    }
})


router.post('/get_address_gst_by_party', async (req, res) => {
    const { party_name } = req.body;
    try {
        const companyDetails = await Company.findOne({ party_name });        
        if (companyDetails) {
            res.status(200).json(companyDetails);
            console.log(companyDetails);
        } else {
            res.status(404).json({ error: 'Company details not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports=router