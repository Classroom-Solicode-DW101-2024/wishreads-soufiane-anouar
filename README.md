[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/1gnnQuhz)
# Brief07-WishReads
# Contexte de l'Application WishReads

L'application **WishReads** est conçue pour exploiter les données d'une librairie en ligne enregistrées dans un fichier `books.json`. Elle permet aux utilisateurs de sauvegarder leurs livres préférés dans une liste de lecture et d'accéder aux détails des livres disponibles. Cette application inclut trois pages principales pour une expérience utilisateur fluide et interactive.

## Pages à Créer

### 1. Page `index.html` : Liste des Livres
   - Cette page affiche tous les livres disponibles dans la librairie.
   - Chaque livre apparaît sous forme de carte contenant :
     - **Image de couverture** : Une illustration du livre.
     - **Titre du livre**
     - **Nom de l'auteur**
   - L’utilisateur peut interagir avec chaque carte de livre de différentes manières :
     - **Marquer comme favori** : En cliquant sur une icône de favori, le livre est ajouté à la liste de lecture appelée **"wishes"**.
     - **Lien "Détails"** : Redirige vers la page `details.html` pour voir plus d’informations sur le livre.

### 2. Page `details.html` : Détails d’un Livre
   - Cette page présente des informations détaillées sur un livre sélectionné.
   - Contenu :
     - **Image de couverture**
     - **Titre du livre**
     - **Nom de l'auteur** et sa **biographie**
     - **Description du livre** (si disponible dans les données)
     - **Année de publication**

### 3. Page `MyWishReads.html` : Liste des Livres Favoris
   - Cette page affiche tous les livres que l’utilisateur a marqués comme favoris.
   - Chaque livre favori apparaît avec :
     - **Titre du livre**
     - **Lien PDF**  pour consulter le livre en ligne ou le télécharger.
     - **Bouton "Retirer"** : Permet de supprimer le livre de la liste des favoris.
     - **Icône pour marquer comme lu** : L’utilisateur peut marquer un livre comme lu, ce qui modifie l'état visuel de l’icône.

## Données et Fichier `books.json`
Le fichier `books.json` contient les données de la librairie en ligne, incluant :
- **Titre**
- **Auteur**:avec son **nomComplet** et sa **biographie**
- **Image de couverture**
- **Description** (optionnel)
- **Lien PDF**
- **DatePublication** 

## Fonctionnalités Clés
- **Sauvegarde des livres favoris** : Les utilisateurs peuvent ajouter des livres à leur liste de souhaits en les marquant comme favoris.
- **Affichage de détails** : Une page dédiée permet de consulter des informations détaillées sur chaque livre.
- **Liste de lecture personnalisée** : La page **MyWishReads** permet de gérer facilement les livres favoris et de marquer les livres comme lus.
- **Persistance des données** : L'application sauvegarde les livres favoris afin qu'ils soient accessibles entre les sessions (utilisation du LocalStorage).

## Travail à rendre
- Maquettes de l'application avec la charte graphique utilisée
- Code source html,css,js

Cette application **WishReads** propose une solution pratique pour gérer une liste de lecture de livres en ligne, adaptée aux utilisateurs souhaitant organiser et suivre leurs livres préférés.
