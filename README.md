# Vites & Gourmand

Application web (ECF DWWM) : plateforme de catering (menus, commandes, avis, back-office).

## Prérequis

- Node.js (LTS recommandé)
- Docker Desktop (WSL2)

## Démarrage en local

### - Lancer les bases (PostgreSQL + MongoDB)

Depuis la racine du projet :

```bash
docker compose up -d
docker ps
```

Arrêt : `docker compose down`\
Logs : `docker compose logs -f`

### - Lancer le frontend

```
cd frontend
npm i
npm run dev
```

Frontend : http://localhost:5173

### - Lancer le Backend (à venir)
