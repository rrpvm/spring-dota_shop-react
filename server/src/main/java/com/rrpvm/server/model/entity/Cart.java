package com.rrpvm.server.model.entity;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.Column;
import javax.persistence.OneToMany;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.CascadeType;
import java.util.List;

@Entity
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "cart_id")
    private Long id;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = CartItem.class)
    @JoinTable(name = "carts_items",
            joinColumns = {
                    @JoinColumn(name = "cart_id", referencedColumnName = "cart_id", nullable = false, unique = false)
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "cart_item_id", referencedColumnName = "cart_item_id", nullable = false, unique = false),

            })
    private List<CartItem> items;
    @OneToOne(mappedBy = "cart", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(referencedColumnName = "user_id", name = "user_id")
    private User user;

    public Cart(List<CartItem> items, User user) {
        this.items = items;
        this.user = user;
    }

    public Cart() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
