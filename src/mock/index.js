import {createServer, Model} from "miragejs"

export function makeServer({environment = "development"} = {}) {
    return createServer({
        environment,

        models: {
            user: Model,
        },

        seeds(server) {
            server.create("user", {name: "Leonardo Minari", username: "leominari", password: "123456"})
        },

        routes() {
            this.namespace = "api"

            this.get("/users", (schema) => {
                return schema.users.all()
            })

            this.post("/login", ({users}, request) => {
                const attrs = JSON.parse(request.requestBody)

                let user = users.findBy({username: attrs.username})

                if (!user || (user.attrs.password !== attrs.password)) {
                    return {
                        status: 400,
                        data: {
                            errors: ['Usuário ou Senha incorretos']
                        }
                    };
                }

                return {
                    status: 200,
                    data: {
                        name: user.attrs.name,
                        username: user.attrs.username,
                        token: 'token'
                    },

                };
            })
        },
    })
}
