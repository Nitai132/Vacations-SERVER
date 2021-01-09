const ADD_FOLLOWER_QUERY = 'insert into followedvacations (user_id, vacation_id) values (?,?)';
const DELETE_FOLLOWER_QUERY = 'DELETE FROM `followedvacations` WHERE user_id = ? and vacation_id = ?';
const ADD_VACATION_QUERY = "insert into vacations (description, destination, image, fromDate, untilDate, price) values (?,?,?,?,?,?)";
const DELETE_VACATION_QUERY = "DELETE FROM vacations WHERE id = ?";
const UPDATE_VACATION_QUERY = "UPDATE `vacations` SET `description`= ?,`destination`= ?,`image`= ?,`fromDate`= ?,`untilDate`= ?,`price`= ? WHERE id = ?";
const GET_ALL_VACATIONS_QUERY = "SELECT * FROM vacations";
const GET_VACATION_LIKES_QUERY = "select count(*) from followedvacations where vacation_id = ?";
const CHECK_IF_LIKE_EXISTS_QUERY = "select count(*) from followedvacations where user_id = ? and vacation_id = ?";
const GET_LIKE_BY_ID_QUERY = "select count(*) from followedvacations where vacation_id = ?";



const getVacationLikes = id => global.mysqlConnection.execute(GET_VACATION_LIKES_QUERY, [id]);

const getLikesById = id => global.mysqlConnection.execute(GET_LIKE_BY_ID_QUERY, [id]);

const getAllVacations = () => global.mysqlConnection.execute(GET_ALL_VACATIONS_QUERY, []);

const addFollower = (user_id, vacation_id) =>  global.mysqlConnection.execute(ADD_FOLLOWER_QUERY, [user_id, vacation_id]);

const deleteFollower = (user_id, vacation_id) =>  global.mysqlConnection.execute(DELETE_FOLLOWER_QUERY, [user_id, vacation_id]);

const addVacation = (description, destination, image, fromDate, untilDate, price) => global.mysqlConnection.execute(ADD_VACATION_QUERY, [description, destination, image, fromDate, untilDate, price]);

const updateVacation = (description, destination, image, fromDate, untilDate, price, id) => global.mysqlConnection.execute(UPDATE_VACATION_QUERY, [description, destination, image, fromDate, untilDate, price, id])

const deleteVacation = (id) => global.mysqlConnection.execute(DELETE_VACATION_QUERY, [id]);

const checkIfLikeExists = (userid, vacationid) => global.mysqlConnection.execute(CHECK_IF_LIKE_EXISTS_QUERY, [userid, vacationid]);





module.exports = {
    addFollower,
    deleteFollower,
    addVacation, 
    deleteVacation, 
    updateVacation, 
    getAllVacations, 
    getVacationLikes, 
    checkIfLikeExists,
    getLikesById,
};