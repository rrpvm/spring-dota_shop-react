package com.rrpvm.server.dao.repository;

import com.rrpvm.server.model.entity.Cart;
import com.rrpvm.server.model.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {
    @Deprecated
    List<CartItem>findAllByCart(Cart cart);
    List<CartItem>findAllByCartAndDeletedNot(Cart cart, boolean deleted);
}
