import {createServer, Model} from "miragejs"

export function makeServer({environment = "development"} = {}) {
    return createServer({
        environment,

        models: {
            user: Model, patient: Model,
        },

        seeds(server) {
            server.create("user", {name: "Admin", username: "admin", password: "admin"})
            // server.create("patient", {
            //     "name": "Leonardo Minari",
            //     "motherName": "Vania Soares",
            //     "birthDate": "17/07/1997",
            //     "CPF": "461.689.048-08",
            //     "CNS": "829 9521 2501 0004",
            //     "address": {
            //         "address": "Rua Balduíno Taques",
            //         "number": "1477",
            //         "state": "PR",
            //         "city": "Ponta Grossa",
            //         "neighborhood": "Centro",
            //         "CEP": "84010-050"
            //     }
            // })

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
                        status: 400, data: {
                            errors: ['Usuário ou Senha incorretos']
                        }
                    };
                }

                return {
                    status: 200, data: {
                        name: user.attrs.name, username: user.attrs.username, photo: user.attrs.photo, token: 'token'
                    },

                };
            })


            this.post("/patients", ({patients}, request) => {
                const attrs = JSON.parse(request.requestBody)
                let newPatient = patients.create(attrs)

                return {
                    status: 200, data: {...newPatient},

                };
            })


            this.delete('/patients/:id', ({patients}, request) => {
                const id = request.params.id;
                patients.find(id).destroy();

                return {
                    status: 200,

                };
            })



            this.put('/patients/:id', ({patients}, request) => {
                const id = request.params.id;
                const attrs = JSON.parse(request.requestBody)
                const patient = patients.find(id);


                patient.update(attrs);

                return {
                    status: 200,
                    data: {...patient.attrs}
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
                            CPF: user.attrs.CPF,
                            CNS: user.attrs.CNS,
                        }
                    })

                return {
                    status: 200, data: patientsList
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
