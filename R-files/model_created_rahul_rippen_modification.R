if (FALSE){
install.packages("randomForest")
install.packages("ggplot2")
library(randomForest)
library(ggplot2)
install.packages("caret")
library(caret) # for confusion matrix
install.packages("caTools")
library(caTools) # for split

#req
data = read.csv("C:/Users/waqas/desktop/heart_failure.csv")
head(data)

#View(data)
nrow(data[data$DEATH_EVENT == 1, ])
nrow(data[data$DEATH_EVENT == 0, ])
# target attribute is not balanced 


#str(data)

cat_attr = c(2,4,6,10,11,13) 

for(i in cat_attr){
  data[,i] = as.factor(data[,i])
}
str(data)
#nrow(data)
#ncol(data)

#length(data[is.na(data)])

set.seed(200)
split = sample.split(data,SplitRatio = .6)
test_data = subset(data, split == FALSE)
data = subset(data, split == TRUE)
#nrow(data)



rf = randomForest(data$Death~., data = data)
#rf

err_df = data.frame(ntree = c(1:500), error = rf$err.rate[,1])
#err_df

#--------plot 1, to be shown in app-----------
ggplot(err_df) + 
  geom_line(mapping = aes(x = ntree, y = error))


#--------no of features------------------
feature_error_df = data.frame(no_of_features = -1, error = -1)

for(i in 1: (ncol(data)-1)){
  temp = randomForest(data$Death ~ . , data = data, mtry = i) 
  feature_error_df[i,] = data.frame(i,temp$err.rate[nrow(temp$err.rate),1])
}

#feature_error_df


#----selected 4------


##----------no of trees-------------
nt = 1000

rf1000 = randomForest(data$Death~., data = data,ntree = nt, mtry = 4)

#head(rf1000$err.rate)

err_df = data.frame(ntree = rep(c(1:nt),times = 3),
                    Type = rep(c('OOB','0','1'), each = nt),
                    error = c(rf1000$err.rate[,1],
                              rf1000$err.rate[,2], rf1000$err.rate[,3])
)
#err_df
#View(err_df)

#tail(err_df)

#------plot 2, to be shown----------------------
ggplot(err_df) + 
  geom_line(mapping = aes(x = ntree, y = error,col = Type))

rf1000
head(err_df)



ntree_minerror = err_df[err_df[1:nt,3] == min(err_df[1:nt,3]), ]
ntree_minerror
#select 141





model = randomForest(Death ~ . , data = data , ntree = 141, mtry = 4, )
model


#------saving model as rdf---------
saveRDS(model, "model.rds")
tab = model$confusion
tab

pred = predict(model,test_data[,-13])
actual = test_data[,13]

print(test_data[3,-13])
tab = table(pred = pred, actual = actual)
tab
confusionMatrix(tab)
}

#####Arif's EXPRESS.JS RESPONSE FUNCTION####
predictor2 <- function(age, ser,cre, dia,eje,bp,plt,seso,secre,sex,smok,time){
age <- as.integer(age)
ser <- as.integer(ser)
cre <- as.integer(cre)
dia <- as.integer(dia)
eje <- as.integer(eje)
bp <- as.integer(bp)
plt <- as.integer(plt)
seso <- as.integer(seso)
secre<- as.integer(secre)
sex <- as.integer(sex)
smok <- as.integer(smok)
time <- as.integer(time)
library(randomForest) 
#Data bug fix
data = read.csv("C:/Users/waqas/desktop/heart_failure.csv")
cat_attr = c(2,4,6,10,11,13) 
for(i in cat_attr){
  data[,i] = as.factor(data[,i])
}
#!Data bug fix 
model <- readRDS("C:/Users/waqas/desktop/model.rds")
input_from_android <- data.frame(age, ser,cre, dia,eje,bp,plt,seso,secre,sex,smok,time,0)

names(input_from_android) <- c("Age", "Anaemia", "Creatinine.Phosphokinase","Diabetes","Ejection.Fraction","High.Blood.Pressure","Platelets","Serum.Creatinine","Serum.Sodium","Sex","Smoking", "Time","Death")
df3 <- rbind(data, input_from_android)
#str(df3)

res = predict(model,df3[nrow(df3),])
if(res == 1) output_for_android = 1 else output_for_android = 0
print(output_for_android)
}

#####END OF EXPRESS RESPONSE FUNCTION####
######################################Rippen_function########################################

predictor <- function(best_rf,var1,var2,var3,var4,var5,var6,var7,var8,var9,var10,var11,var12){
  var2=as.factor(var2);#I'm not sure about semicolons ;) ..to dekh lena error aye to hta lena
  var4 = as.factor(var4);
  var6 = as.factor(var6);
  var10 = as.factor(var10);
  var11 = as.factor(var11);
  df <- data.frame(var1,var2,var3,var4,var5,var6,var7,var8,var9,var10,var11,var12)
  res <-  predict(best_rf,df)
  return(res)
}

#A model with 77% recall (hospital so using recall), and 85% accuracy 
