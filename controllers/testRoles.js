exports.all = (req, res) => {
    res.status(200).send("Accessible publiquement.");
};

exports.utilisateur = (req, res) => {
    res.status(200).send("Accessible au role `utilisateur`.");
};

exports.personne = (req, res) => {
    res.status(200).send("Accessible au role `personne`.");
};

exports.admin = (req, res) => {
    res.status(200).send("Accessible au role `admin`.");
};