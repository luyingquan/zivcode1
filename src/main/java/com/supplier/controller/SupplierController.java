package com.supplier.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.supplier.entity.Supplier;
import com.supplier.service.SupplierService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Api(tags = "供应商管理")
@RestController
@RequestMapping("/api/suppliers")
@RequiredArgsConstructor
public class SupplierController {

    private final SupplierService supplierService;

    @ApiOperation("分页查询供应商")
    @GetMapping
    public Page<Supplier> list(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String type) {
        
        Page<Supplier> page = new Page<>(current, size);
        LambdaQueryWrapper<Supplier> wrapper = new LambdaQueryWrapper<>();
        
        if (name != null && !name.isEmpty()) {
            wrapper.like(Supplier::getName, name);
        }
        if (type != null && !type.isEmpty()) {
            wrapper.eq(Supplier::getType, type);
        }
        
        return supplierService.page(page, wrapper);
    }

    @ApiOperation("获取供应商详情")
    @GetMapping("/{id}")
    public Supplier getById(@PathVariable Long id) {
        return supplierService.getById(id);
    }

    @ApiOperation("新增供应商")
    @PostMapping
    public boolean save(@RequestBody Supplier supplier) {
        return supplierService.save(supplier);
    }

    @ApiOperation("更新供应商")
    @PutMapping("/{id}")
    public boolean update(@PathVariable Long id, @RequestBody Supplier supplier) {
        supplier.setId(id);
        return supplierService.updateById(supplier);
    }

    @ApiOperation("删除供应商")
    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable Long id) {
        return supplierService.removeById(id);
    }
} 