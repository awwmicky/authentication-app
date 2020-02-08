/* test database */

let users_db = [
    {
        id: '123abc321', 
        email: 'test@test.com',
        password:
            '$2a$04$17eXs2DDhaMAdWG0rhGKX.vgx3oHpISVr8NvweNdQRXSuNZDKlhGW',
        // password: 'password'
    },
    {
        id: 'q0a2z4z6a8q',
        email: 'qaz@qaz.com',
        password: 
            '$2a$04$6QuWLVifazRaNguolu/ztOaAuZKBk9Nb.xpl0SLDZ9fv3EW2pd/Qi',
        // password: 'qaz'
    },
    {
        id: 'q1w3e5e7w9q',
        email: 'qwe@qwe.com',
        password: '$2a$04$pHM7bTR2owOk5.48iXxraOiQDXpQg/tXYiGMP1Na10RiuqlOwWCNy'
        // password: 'qwe'
    },
    {
        id: 'zyx987xyz',
        email: 'fake@fake.com',
        password: 
            '$2a$04$WITUchzidw.c/0G9i/jYAOZq.9T2kFJ2G35Aic1j97ScQKEP63.pi',
        // password: 'hidden'
    }
];



module.exports = users_db;