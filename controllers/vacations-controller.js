const express = require('express');
const router = express.Router();
const {
    addFollower,
    deleteFollower,
    addVacation,
    deleteVacation,
    updateVacation,
    getAllVacations,
    getVacationLikes,
    checkIfLikeExists,
    getLikesById,
} = require('../services/vacations-service');

const {notAdminValidation, 
    isAdminValidation, 
    addVacationValidation
} = require('../validations/vacations-validations');

const {badRequestHandler, SuccessRequestHandler} = require('../utils');


router.get('/addFollower/:vacationid', notAdminValidation, async (req, res) => {
    try {
        const {vacationid} = req.params;
        const {id: userid} = req.user
        await addFollower(userid, vacationid);
        return SuccessRequestHandler(res);
    } catch(err) {
        return badRequestHandler(res);
    }
});

router.delete('/deleteFollower/:id', notAdminValidation, async (req, res) => {
    try {
        const {id: vacation_id} = req.params;
        const {id: user_id} = req.user;
        console.log(user_id, vacation_id)
        await deleteFollower(user_id, vacation_id);
        return SuccessRequestHandler(res);
    } catch(err) {
        console.log(err);
        return badRequestHandler(res);
    }
});


router.post('/addVacation', isAdminValidation, addVacationValidation, async (req, res) => {
    try {
        const {description,destination,image,fromDate,untilDate,price} = req.body;
        await addVacation(description, destination, image, fromDate, untilDate, price);
        return SuccessRequestHandler(res);
    } catch(err) {
        console.log(err);
        return badRequestHandler(res);
    }
});

router.delete('/deleteVacation/:id',isAdminValidation,  async (req, res) => {
    try {
        const {id} = req.params;
        await deleteVacation(id);
        return SuccessRequestHandler(res);
    } catch(err) {
        console.log(err);
        return badRequestHandler(res);
    }
});



router.post('/updateVacation/:id',isAdminValidation, addVacationValidation, async (req, res) => {
    try {
        const {description,destination,image,fromDate,untilDate,price} = req.body;
        const {id} = req.params;
        await updateVacation(description, destination, image, fromDate, untilDate, price, id);
        return SuccessRequestHandler(res);
    } catch(err) {
        console.log(err);
        return badRequestHandler(res);
    }
})

router.get('/getLikesById/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const [row] = await getLikesById(id);
        return res.json({likes: Object.values(row[0])[0]})
    } catch(err) {
        console.log(err);
        return badRequestHandler(res);
    }
})

router.get('/doesLikeExists/:id', async (req, res) => {
    try {
        const {id: vacationid} = req.params;
        const {id: userid} = req.user;
        const [row] = await checkIfLikeExists(userid, vacationid);
        return res.json({exists: Object.values(row[0])[0]});
    } catch(err) {
        console.log(err);
        return badRequestHandler(res);
    }
})


router.get('/getVacationLikes/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const [row] = await getVacationLikes(id);
        return res.json({likes: Object.values(row[0])[0]});
    } catch(err) {
        console.log(err);
        return badRequestHandler(res);
    };
})


router.get('/getAllVacationsLikes', async (req, res)=> {
    try {
        const [row] = await getAllVacations();
        let result = []
        for (let i=0;i<row.length;i++) {
            const likes = await getLikesById(row[i].id);
            result.push({
                name: row[i].destination,
                y: Object.values(likes[0][0])[0]
            })
        };
        return res.json({result})
    } catch(err) {
        console.log(err)
    }
})

router.get('/allvacations', async (req, res)=> {
    try {
        const [row] = await getAllVacations();
        let result = []
        for (let i=0;i<row.length;i++) {
            const likes = await getLikesById(row[i].id);
            Object.assign(row[i], {likes: Object.values(likes[0][0])[0]})
        }  
        return res.json({vacations: row})
    } catch(err) {
        console.log(err)
    }
})

router.get('/userDetails', async (req, res)=> {
    try {
        const userDetails = req.user;
        return res.json({userDetails})
    } catch(err) {
        console.log(err)
        return res.sendStatus(403);
    }
})


module.exports = router;