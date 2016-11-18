﻿"use strict";

var pedido = function () {

    var self = {};

    self.initialize = function () {
        this.configuracoes();
        bindPedido();
        bindConfirmarPedido();
        bindRemoverItem();
        bindCancelarPedido();
    };

    self.configuracoes = function () {
        $(".modal").modal();
    };

    var bindPedido = function () {

        $(".collection").on("click", ".collection-item", function () {
            var $badge = $('.badge', this);

            if ($badge.length === 0) {
                $badge = $("<span class='badge brown-text'>0</span>").appendTo(this);
            }

            $badge.text(parseInt($badge.text()) + 1);

            var nomeProduto = this.firstChild.textContent;
            Materialize.toast(nomeProduto + " adicionado", 1000);
        });
    };

    var bindConfirmarPedido = function () {

        $("#confirmar").on("click", function () {
            var texto = "";

            $(".badge").parent().each(function () {
                texto += this.firstChild.textContent + ": ";
                texto += this.lastChild.textContent + ", ";
            });

            $("#resumo").empty().text(texto);
        });
    };

    var bindRemoverItem = function () {

        $(".collection").on("click", ".badge", function () {
            $(this).remove();
            return false;
        });
    };

    var bindCancelarPedido = function () {
        $(".acao-limpar").on("click", function () {
            $("#numero-mesa").val("");
            $(".badge").remove();
        });
    };

    return self;

};

window.onload = function () {
    new pedido().initialize();
}