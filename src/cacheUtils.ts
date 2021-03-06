/**
 * @license
 * Copyright 2021 Alexey Volkov
 * SPDX-License-Identifier: Apache-2.0
 * @author         Alexey Volkov <alexey.volkov+oss@ark-kun.com>
 * @copyright 2021 Alexey Volkov <alexey.volkov+oss@ark-kun.com>
 */

export const httpGetWithCache = async (
  urlOrRequest: string | RequestInfo,
  cacheName: string,
  updateIfInCache: boolean = false
): Promise<Response> => {
  const cache = await caches.open(cacheName);
  const response = await cache.match(urlOrRequest);
  if (response !== undefined) {
    if (updateIfInCache) {
      cache.add(urlOrRequest);
    }
    return response;
  }
  await cache.add(urlOrRequest);
  const response2 = await cache.match(urlOrRequest);
  if (response2 === undefined) {
    return Promise.reject("Added object to cache, but could not find it");
  }
  return response2;
};
