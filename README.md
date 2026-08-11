


# 🎓 Portfolio — Lom Mamadou Hamady | BUT Science des Données

Portfolio personnel développé en HTML, CSS et JavaScript. Hébergé sur GitHub Pages.

---

## 📁 Structure du projet

```
portfolio/
├── index.html          ← Page principale (tout le site)
├── css/
│   └── style.css       ← Tous les styles
├── js/
│   └── main.js         ← Interactivité (filtres, modal, carrousel...)
├── assets/
│   ├── img/
│   │   └── photo.jpg   ← Votre photo de profil
│   └── cv-diallo-moussa.pdf  ← Votre CV en PDF
└── README.md
```

---

## ✏️ Comment personnaliser le site

### 1. Votre identité (index.html)
Recherchez et remplacez dans `index.html` :

| Chercher | Remplacer par |
|---|---|
| `Diallo Moussa` | Votre prénom et nom |
| `moussa.diallo@email.com` | Votre adresse mail |
| `github.com/moussa-diallo` | Votre profil GitHub |
| `Paris, France` | Votre ville |

### 2. Votre photo
- Ajoutez votre photo dans `assets/img/photo.jpg`
- Si vous n'avez pas de photo, le site affiche automatiquement vos initiales

### 3. Votre CV
- Ajoutez votre CV en PDF dans `assets/cv-diallo-moussa.pdf`

### 4. Vos formations
Dans `index.html`, cherchez `<!-- FORMATIONS -->` et modifiez les 3 blocs `.timeline-item`

### 5. Vos projets
Chaque projet est un bloc `.project-card`. Modifiez :
- `data-title` : nom du projet
- `data-desc` : description détaillée (apparaît dans le popup)
- `data-tech` : technologies séparées par des virgules
- `data-github` : URL GitHub (laissez vide si pas de repo)
- `data-tags` : mots-clés pour les filtres (python, r, sql, ml)

Pour **ajouter un projet**, copiez-collez un bloc `.project-card` existant.

### 6. Vos compétences (logos)
Dans `index.html`, cherchez `<!-- COMPÉTENCES -->` et ajoutez/retirez des `.skill-item`.
Les logos viennent de : `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/`
Liste complète des logos disponibles : https://devicon.dev

---

## 🚀 Héberger sur GitHub Pages

### Étape 1 — Créer le dépôt GitHub
1. Allez sur [github.com](https://github.com) et connectez-vous
2. Cliquez sur **"New repository"**
3. Nommez-le exactement : `votre-username.github.io`
   (exemple : si votre username est `moussa-diallo`, le repo s'appelle `moussa-diallo.github.io`)
4. Cochez **"Public"**
5. Cliquez **"Create repository"**

### Étape 2 — Uploader les fichiers
**Option A — via l'interface GitHub (la plus simple) :**
1. Dans votre nouveau dépôt, cliquez **"uploading an existing file"**
2. Glissez-déposez tous vos fichiers (index.html, dossiers css/, js/, assets/)
3. Cliquez **"Commit changes"**

**Option B — via Git (en ligne de commande) :**
```bash
git init
git add .
git commit -m "Premier commit - portfolio"
git branch -M main
git remote add origin https://github.com/votre-username/votre-username.github.io.git
git push -u origin main
```

### Étape 3 — Activer GitHub Pages
1. Dans votre dépôt, allez dans **Settings** (onglet en haut)
2. Dans le menu gauche, cliquez **"Pages"**
3. Sous "Source", sélectionnez **"Deploy from a branch"**
4. Choisissez la branche **"main"** et le dossier **"/ (root)"**
5. Cliquez **"Save"**

### Étape 4 — Voir votre site
Attendez 1-2 minutes puis votre site sera accessible à :
```
https://votre-username.github.io
```

---

## 📧 Formulaire de contact

Le formulaire est actuellement en mode simulation. Pour recevoir de vrais emails :

**Option recommandée — Formspree (gratuit) :**
1. Créez un compte sur [formspree.io](https://formspree.io)
2. Créez un nouveau formulaire et copiez votre endpoint
3. Dans `js/main.js`, remplacez la section "Simulation envoi" par :
```javascript
const response = await fetch('https://formspree.io/f/VOTRE_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message: msg })
});
if (response.ok) {
  formNote.textContent = 'Message envoyé avec succès !';
}
```

---

## 🎨 Fonctionnalités

- ✅ Design professionnel et responsive (mobile + desktop)
- ✅ Mode sombre / clair avec mémoire (localStorage)
- ✅ Carrousel infini des compétences avec vrais logos
- ✅ Filtres dynamiques par technologie
- ✅ Popup détaillé pour chaque projet
- ✅ Frise chronologique des formations animée
- ✅ Compteurs animés
- ✅ Formulaire de contact
- ✅ Bouton retour en haut
- ✅ Animations au scroll

---

*Développé avec HTML · CSS · JavaScript — Hébergé sur GitHub Pages*
