# -work_assistant
*Удобный доступ к Вашей Базе данных*
---
# Описание системных таблиц
- *Users* - пользователи программы
> *Id* - первичный ключ
> *Login* - логин, "admin" при первом запуске системы
> *Password* - пароль, "admin" при первом запуске системы
> *Name* - ФИО
> *Phone* - телефон
> *Email* - почта

- *Dictionarys* - справочники констант
> *Id* - первичный ключ
> *Value* - значение
> *Type* -  тип: DOC(документ), DIC(справочник)
> *Users* - список логинов через запятую у кого есть доступ к справочнику

- *Documents* - список документов пользователей
> *Id* - первичный ключ
> *Name* - наименование документа на русском
> *TableName* - наименование документа на английском в базе
> *Users* - список логинов через запятую у кого есть доступ к документу

- *DocColumns* - список столбцов документов
> *Id* - первичный ключ
> *TableId* - ключ таблицы
> *Name* - наименование столбцов на русском
> *ColumnName* - наименование столбцов на английском в базе
> *Type* - тип: DIC(справочник), DOC(документ), INTEGER(число), STRING(символ), USER(пользователь), DATE(дата)
> *DictionaryId* - ключ справочника