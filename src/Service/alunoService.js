import * as alunoRepository from '../repositories/alunoRepository.js';

export async function findAll() {
    return alunoRepository.findAll();
}

export async function findById(id) {
    return alunoRepository.findById(id);
}

export async function create(nome, curso) {
    return alunoRepository.create(nome, curso);
}

export async function update(id, nome, curso) {
    return alunoRepository.update(id, nome, curso);
}

export async function remove(id) {
    return alunoRepository.remove(id);
}
// Nova regra de negócio, exigindo que o nome do aluno deve ter pelo menos 3 caracteres.
export async function create(nome, curso) {

    if (nome.trim().length < 3) {
        throw new Error('O nome deve ter pelo menos 3 caracteres');
    }

    return alunoRepository.create(nome, curso);
}