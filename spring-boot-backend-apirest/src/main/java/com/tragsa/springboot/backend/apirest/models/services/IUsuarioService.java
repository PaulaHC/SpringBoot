package com.tragsa.springboot.backend.apirest.models.services;

import com.tragsa.springboot.backend.apirest.models.entity.Usuario;

public interface IUsuarioService {

	public Usuario findByUsername(String username);
}
