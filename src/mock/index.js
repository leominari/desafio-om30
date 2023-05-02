import {createServer, Model} from "miragejs"

export function makeServer({environment = "development"} = {}) {
    return createServer({
        environment,

        models: {
            user: Model,
            patient: Model,
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
                        photo: user.attrs.photo,
                        token: 'token'
                    },

                };
            })


            this.post("/patients", ({patients}, request) => {
                const attrs = JSON.parse(request.requestBody)
                let newPatient = patients.create(attrs)

                return {
                    status: 200,
                    data: {...newPatient},

                };
            })


            this.delete('/patients', ({patients}, request) => {
                console.log(request)
                return {
                    status: 200,
                    data: {...newPatient},

                };
            })


            this.get("/patients", ({patients}) => {

                let patientsList = patients
                    .all()
                    .models
                    .map((user) => {
                        return {
                            id: user.attrs.id,
                            name: user.attrs.name,
                            motherName: user.attrs.motherName,
                            birthDate: user.attrs.birthDate,
                            cpf: user.attrs.cpf,
                            cns: user.attrs.cns,
                        }
                    })

                return {
                    status: 200,
                    data: patientsList
                }
            })

            this.get("/patients/:id", ({patients}, request) => {
                let patientsList = patients.findBy({id: request.params.id})

                return {
                    status: 200,
                    data: patientsList.attrs,
                }
            })

            this.passthrough("https://viacep.com.br/ws/*")

            this.get(':cep/json', async (schema, request) => {
                const cep = request.params.cep;
                return await fetch(`https://viacep.com.br/ws/${cep}/json`);
            });


        },
    })
}
