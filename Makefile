up:
	docker compose up -d --force-recreate
bash:
	docker compose exec selenium-nodejs bash
test:
	docker compose exec selenium-nodejs yarn test