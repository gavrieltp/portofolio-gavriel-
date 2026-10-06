const db = require('../config/db');

const getAllSkills = (callback) => {
    const query =`
        SELECT
            skills.id,
            skills.skill_group_id,
            skills.name,
            skills.level,
            skills.percentage,
            skills_group.title AS group_title,
            skills_group.icon AS group_icon
        FROM skills
        JOIN skills_group ON skills.skill_group_id = skills_group.id
        ORDER BY skills_group.id ASC, skills.percentage DESC, skills.id ASC
    `;
    db.query(query, (err, results) => {
    callback(err, results);
})
}

module.exports = {
    getAllSkills
};
