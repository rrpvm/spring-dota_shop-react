package com.rrpvm.server.model.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.logging.LogRecord;

@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @ElementCollection(targetClass = SimpleGrantedAuthority.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "users_authorities", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id"))
    @Column(name = "authorities")
    private Collection<SimpleGrantedAuthority> authorities;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = ItemSellLog.class)
    @JoinTable(name = "user_buy_logs",
            joinColumns = {
                    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false, unique = false)
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "log_id", referencedColumnName = "log_id", nullable = false, unique = false),

            })
    private List<LogRecord> buyLogs;

    public User(String username, String password, String role, List<LogRecord> logRecords) {
        this.username = username;
        this.password = password;
        List<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority(role));
        this.authorities = authorities;
        this.buyLogs = logRecords;
    }

    public User() {

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setAuthorities(Collection<SimpleGrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    public List<LogRecord> getBuyLogs() {
        return buyLogs;
    }

    public void setBuyLogs(List<LogRecord> buyLogs) {
        this.buyLogs = buyLogs;
    }
}
