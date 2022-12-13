import { computed } from "vue";
import {
  mapGetters,
  mapState,
  mapMutations,
  useStore,
  createNamespacedHelpers,
} from "vuex";

const useMapper = (mapper, mapFn) => {
  const store = useStore();

  const storeStateFns = mapFn(mapper);
  const storeState = {};
  Object.keys(storeStateFns).forEach((keyFn) => {
    const fn = storeStateFns[keyFn].bind({ $store: store });
    storeState[keyFn] = computed(fn);
  });

  return storeState;
};

export const useState = (moduleName, mapper) => {
  let mapperFn = mapState;
  if (typeof moduleName === "string" && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapState;
  } else {
    mapper = moduleName;
  }
  return useMapper(mapper, mapperFn);
};

export const useGetters = (moduleName, mapper) => {
  let mapperFn = mapGetters;
  if (typeof moduleName === "string" && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapGetters;
  } else {
    mapper = moduleName;
  }
  return useMapper(mapper, mapperFn);
};
export const useMutations = (moduleName, mapper) => {
  let mapperFn = mapMutations;
  if (typeof moduleName === "string" && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapMutations;
  } else {
    mapper = moduleName;
  }
  return useMutations(mapper, mapperFn);
};
