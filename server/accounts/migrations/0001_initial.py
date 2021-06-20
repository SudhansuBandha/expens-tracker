# Generated by Django 3.2.3 on 2021-05-30 02:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Accounts',
            fields=[
                ('bank_name', models.CharField(max_length=50)),
                ('account_number', models.CharField(max_length=13, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ('-created_at',),
            },
        ),
        migrations.CreateModel(
            name='Transactions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction_amount', models.DecimalField(decimal_places=2, max_digits=7)),
                ('date', models.DateField()),
                ('category', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('account_number', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.accounts')),
            ],
            options={
                'ordering': ('-created_at',),
            },
        ),
    ]
