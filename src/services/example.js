import * as http from '../utils/request';

export function query() {
  return http.request('/api/users');
}

export function getProduct() {
  return http.request('/api/product')
}