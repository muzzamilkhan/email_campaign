# Email Campaign Manager

This monorepo project contains

- Admin panel to manage campaigns
- Test website - F1 VIP 

To get up and started, you must have the following installed:
- docker
- nx

Run the following to setup local dynamodb instance:
> cd build \
> docker-compose -f ./docker-compose.yml build \
> docker-compose -f ./docker-compose.yml up

Start F1 VIP website:
> nx serve f1-vip

The website contains the campaign integration key in "src/environments/environment.ts"


Start Admin panel:
> nx serve admin


