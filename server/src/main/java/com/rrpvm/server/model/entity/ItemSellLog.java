package com.rrpvm.server.model.entity;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "item_sell_log")
public class ItemSellLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "log_id")
    private Long logId;
    @Column(name = "sold_time")
    private Date soldTime;
    @Column(name = "sold_price")
    private Double soldPrice;
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "consumer_id", referencedColumnName = "user_id")
    private User consumer;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = ItemSell.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "item_id", referencedColumnName = "item_id")
    private ItemSell item;

    public ItemSellLog(Long logId, Date soldTime, Double soldPrice, User consumer, ItemSell item) {
        this.logId = logId;
        this.soldTime = soldTime;
        this.soldPrice = soldPrice;
        this.consumer = consumer;
        this.item = item;
    }

    public ItemSellLog() {
    }

    public User getConsumer() {
        return consumer;
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
