const indexCtrl = {};

indexCtrl.renderindex = (req, res)=>{
        req.logout();
        res.redirect('login');
    
};

module.exports = indexCtrl;