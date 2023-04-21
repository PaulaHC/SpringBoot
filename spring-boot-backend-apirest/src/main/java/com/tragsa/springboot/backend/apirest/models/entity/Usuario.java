package com.tragsa.springboot.backend.apirest.models.entity;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="usuarios")
public class Usuario implements Serializable {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, length = 20)
    private String username;

    @Column(length = 60)
    private String password;

    private Boolean enable;

    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL )
    private List<Rol> roles;

    

    public Long getId() {
        return id;
    }



    public void setId(Long id) {
        this.id = id;
    }



    public String getUsername() {
        return username;
    }



    public void setUsername(String username) {
        this.username = username;
    }



    public String getPassword() {
        return password;
    }



    public void setPassword(String password) {
        this.password = password;
    }



    public Boolean getEnable() {
        return enable;
    }



    public void setEnable(Boolean enable) {
        this.enable = enable;
    }



    public List<Rol> getRoles() {
        return roles;
    }



    public void setRoles(List<Rol> roles) {
        this.roles = roles;
    }



    private static final long serialVersionUID = 1L;
}