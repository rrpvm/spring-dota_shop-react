package com.rrpvm.server.model.entity;


import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;
import javax.persistence.GenerationType;
import java.util.Date;

@Entity
@Table(name = "item_sell_log")
public class ItemSoldLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "log_id")
    private Long logId;
    @Column(name = "sold_time")
    private Date soldTime;
    @Column(name = "sold_price")
    private Double soldPrice;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = ItemSell.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "item_id", referencedColumnName = "item_id")
    private ItemSell item;

    public ItemSoldLog(Long logId, Date soldTime, Double soldPrice, ItemSell item) {
        this.logId = logId;
        this.soldTime = soldTime;
        this.soldPrice = soldPrice;
        this.item = item;
    }

    public ItemSoldLog() {
    }

    public Date getSoldTime() {
        return soldTime;
    }

    public Double getSoldPrice() {
        return soldPrice;
    }

    public ItemSell getItem() {
        return item;
    }
}
