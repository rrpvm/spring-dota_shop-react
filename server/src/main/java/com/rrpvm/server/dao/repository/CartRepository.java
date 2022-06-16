package com.rrpvm.server.dao.repository;

import com.rrpvm.server.model.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {

}
