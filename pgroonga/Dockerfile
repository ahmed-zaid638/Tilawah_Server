FROM groonga/pgroonga:latest-alpine-17


RUN apk add gcc g++ make cmake git && \
    git clone https://github.com/groonga/groonga-plugin-token-filters-stem.git && \
    cd groonga-plugin-token-filters-stem && \
    ./autogen.sh && \
    ./configure && \
    make && \
    make install