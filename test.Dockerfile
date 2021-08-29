FROM igabriele/node-vscode:12

WORKDIR /app

COPY scripts scripts
COPY src src
COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY yarn.lock yarn.lock

RUN yarn --frozen-lockfile

ENTRYPOINT [ "./scripts/docker/test.sh" ]
