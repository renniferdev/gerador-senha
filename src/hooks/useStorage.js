import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  // parametro key p/buscar
  const getItem = async (key) => {
    try {
      //try tentando buscar o stotage
      //tentar buscar o passwors, AsyncStorage espera ele ir buscar os dados antes de prosseguir . get item tenta buscar
      const passwords = await AsyncStorage.getItem(key);

      return JSON.parse(passwords) || [];
    } catch (error) {
      console.log("Erro ao buscar ", error);
      return []; //array vazia
    }
  };

  const saveItem = async (key, value) => {
    try {
      //buscando itens na lista
      let passwords = await getItem(key);
      //colocando item a mais na lista
      passwords.push(value);
      //salvando no AsyncStorage, ele so salva uma string, para salvar array tem que usar o json
      await AsyncStorage.setItem(key, JSON.stringify(passwords));
    } catch (error) {
      console.log("Erro ao salvar ", error);
    }
  };

  const removeItem = async (key, item) => {
    try {
      let passwords = await getItem(key);
      //'deleta' ele devolve o item atraves da variavel
      let myPasswords = passwords.filter((password) => {
        return password !== item;
      });
      //atualizando o AsyncStorage
      await AsyncStorage.setItem(key, JSON.stringify(myPasswords));

      return myPasswords; //retorna ja a lista atualizada.
    } catch (error) {
      console.log("Erro ao deletar ", error);
    }
  };

  return {
    getItem,
    saveItem,
    removeItem,
  };
};

export default useStorage;
