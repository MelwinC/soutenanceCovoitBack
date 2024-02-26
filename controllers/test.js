exports.all = (req, res) => {
    res.status(200).send({ message: "Accessible publiquement" });
};

exports.utilisateur = (req, res) => {
    res.status(200).send({ message: "Accessible au role `utilisateur`" });
};

exports.personne = (req, res) => {
    res.status(200).send({ message: "Accessible au role `personne`" });
};

exports.admin = (req, res) => {
    res.status(200).send({ message: "Accessible au role `admin`" });
};