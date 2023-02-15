FROM mongo:4.0.3

ARG tag=MongoDB

VOLUME [ "/data" ]

EXPOSE 27019

CMD [ "mongod", "--port", "27019", "--bind_ip_all", "--dbpath", "/data/db" ]
