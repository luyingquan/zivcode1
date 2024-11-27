package com.supplier.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("supplier")
public class Supplier {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    private String code;
    private String name;
    private String type;
    private String level;
    private String contact;
    private String phone;
    private String address;
    private String status;
    
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
    
    private String registeredCapital;
    private LocalDateTime establishDate;
    private String legalRepresentative;
    private String businessScope;
    private String creditRating;
    
    @TableLogic
    private Integer deleted;
} 