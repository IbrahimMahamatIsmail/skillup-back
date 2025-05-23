const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersMapper = require('../dataMapper/usersMapper');

// Gestion de la route de création du compte
exports.createUserAccount = async (req, res) => {
  const { name, email, password } = req.body;
  // Vérification des champs obligatoires
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires'});
  }
  // Vérification de la forme de l'adresse email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Le format de l\'email renseigné est invalide veuilez le corriger' });
  }
  const nomMinuscule = name.toLowerCase();
  const motDePasseMinuscule = password.toLowerCase();
  let motDePasseInvalide = false;
  for (let i = 0; i <= nomMinuscule.length - 4; i++) {
    const sousChaine = nomMinuscule.substring(i, i + 4);
    if (motDePasseMinuscule.includes(sousChaine)) {
      motDePasseInvalide = true;
      break;
    }
  }
  if (motDePasseInvalide) {
    return res.status(400).json({ error: "Pour votre sécurité, votre mot de passe ne doit pas contenir votre nom d'utilisateur ou une partie de 4 lettres consécutives de celui-ci."})
  }
  // Vérification de la force du mot de passe
  const mdpRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{12,}$/;
  if (!mdpRegex.test(password)) {
    return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial(@,#,&, etc) ' });
  }
  try {
    const existingName = await usersMapper.getByName(name.toLowerCase());
    if (existingName) {
      return res.status(400).json({ error: 'Nom d\'utilisateur déjà utilisé. Veuillez en choisir un autre !' });
    }
    const existingUserEmail = await usersMapper.getByEmail(email);
    if (existingUserEmail) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }
    // Déterminer le rôle
    let role_id = 1; // utilisateur par défaut
    if (email === 'skillupapi@skillup.fr') {
      const dejaUnAdmin = await usersMapper.getAdmin();
      if (dejaUnAdmin) {
        return res.status(403).json({ message: 'Un seul administrateur autorisé' });
      }
      role_id = 2; // admin
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await usersMapper.create({ name, email, password: hashedPassword, role_id });
    const nouvelUtilisateur = await usersMapper.getByEmail(email);
    const token = jwt.sign({ id: nouvelUtilisateur.id, role: nouvelUtilisateur.role }, process.env.JWT_SECRET, { 
      expiresIn: '2h'
    });
    res.status(201).json({
      message: `Bienvenue ${name}, votre compte a été créé avec succès ! Un email de confirmation vous a été envoyé.`,
      token,
      utilisateur: nouvelUtilisateur
    });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'inscription" });
  }
};

// Gestion de la route de connexion
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Vérification des champs obligatoires
  if (!email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
  }
  try {
    const utilisateur = await usersMapper.getByEmail(email);
    if (!utilisateur) {
      console.warn('Aucun utilisateur trouvé pour cet email');
      return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
    }
    const passwordMatch = await bcrypt.compare(password, utilisateur.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
    }
    const token = jwt.sign({ id: utilisateur.id, role: utilisateur.role }, process.env.JWT_SECRET, { 
      expiresIn: '2h'
    });
    // J'evite de ne pas renvoyer le mot de passe dans la réponse même si il est hashé
    const { password : mdpHashe, ...utilisateurSansMDP } = utilisateur;
    res.status(200).json({
      message: `Bienvenue ${utilisateur.name}, vous êtes connecté !`,
      token,
      utilisateur : utilisateurSansMDP
    });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
};

