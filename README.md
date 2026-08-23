# État des lieux — v12

Application d'état des lieux d'entrée et de sortie, utilisable hors ligne sur tablette,
téléphone ou ordinateur. Tout reste sur l'appareil : aucune donnée n'est envoyée ailleurs.

## Mise en ligne

Déposer les 8 fichiers à la racine du dépôt GitHub, puis activer GitHub Pages
(Settings → Pages → Branch : main / root).

## v12 — mise en page du document imprimé

1. **Le pied de page se superposait au tableau.** Sur la 2e page et les suivantes,
   la ligne des paraphes se dessinait par-dessus l'en-tête du tableau. Elle est
   maintenant réellement en bas de chaque page.

2. **Une demi-page perdue à chaque pièce.** Un tableau de pièce qui ne rentrait pas
   en entier basculait sur la page suivante, laissant un grand vide. Les tableaux
   peuvent désormais se couper, mais jamais au milieu d'une ligne, et l'en-tête
   du tableau se répète en haut de la page suivante.

3. **Le titre d'une pièce ne reste plus seul en bas d'une page.**

4. **Photos d'ensemble de la pièce.** Le document réservait une place pour des
   photos d'ensemble, mais aucun bouton ne permettait de les prendre. C'est corrigé :
   le bloc « Observations générales sur la pièce » propose maintenant l'appareil
   photo et la galerie.

## v11 — sauvegarde et photos

1. **L'application se fermait après une prise de photo, et tout était perdu.**
   Deux causes : la sauvegarde automatique ne fonctionnait pas hors de l'atelier
   de développement, et le traitement de la photo saturait la mémoire de la tablette.
   Corrigé : sauvegarde réelle sur l'appareil (IndexedDB, repli sur le stockage
   classique) et traitement des photos beaucoup plus léger.

2. **Reprise automatique.** Si l'application se ferme pour une raison quelconque,
   elle rouvre exactement à l'étape en cours, avec les photos et les saisies.

3. **Sauvegarde avant chaque prise de vue**, plus à chaque passage en arrière-plan.
   Une pastille verte apparaît en haut à droite à chaque enregistrement.

4. **Photos plus fiables** : traitées une par une, orientation du capteur respectée,
   message clair si l'une d'elles ne passe pas.

5. **Signatures** : ne s'effacent plus lors d'une rotation de l'écran, et le tracé
   n'est plus interrompu par un geste annulé par le système.

6. **Mises à jour** : le navigateur récupère désormais la dernière version au lieu
   de rester bloqué sur l'ancienne.

7. **Fichiers .json importés** : réparation automatique des fichiers incomplets,
   qui provoquaient auparavant une page blanche.

## Fichiers

- `index.html` — l'application
- `sw.js` — fonctionnement hors ligne
- `manifest.webmanifest` — installation sur l'écran d'accueil
- icônes + `README.md`
