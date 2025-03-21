<script setup>
import { Form, Input } from 'ant-design-vue';
const { Item } = Form;
const { Password } = Input;
</script>

<template>
  <div>
    <Form>
      <Item>
        <Input placeholder="请输入" />
      </Item>
      <Item>
        <Password placeholder="请输入密码" />
      </Item>
    </Form>
  </div>
</template>

<style scoped></style>
