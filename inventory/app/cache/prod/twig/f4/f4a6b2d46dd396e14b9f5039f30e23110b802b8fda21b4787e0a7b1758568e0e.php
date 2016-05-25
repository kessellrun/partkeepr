<?php

/* @Framework/Form/form_errors.html.php */
class __TwigTemplate_2e2c4037ba8ab691ad1ce19ccdfb2a4dc370fde80a35534443663d0bc19fbff0 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_14e4a462b07002f1da60e9a91a02e44bf2bfd8b735c9d11e7147a02eb30dc411 = $this->env->getExtension("native_profiler");
        $__internal_14e4a462b07002f1da60e9a91a02e44bf2bfd8b735c9d11e7147a02eb30dc411->enter($__internal_14e4a462b07002f1da60e9a91a02e44bf2bfd8b735c9d11e7147a02eb30dc411_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/form_errors.html.php"));

        // line 1
        echo "<?php if (count(\$errors) > 0): ?>
    <ul>
        <?php foreach (\$errors as \$error): ?>
            <li><?php echo \$error->getMessage() ?></li>
        <?php endforeach; ?>
    </ul>
<?php endif ?>
";
        
        $__internal_14e4a462b07002f1da60e9a91a02e44bf2bfd8b735c9d11e7147a02eb30dc411->leave($__internal_14e4a462b07002f1da60e9a91a02e44bf2bfd8b735c9d11e7147a02eb30dc411_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/form_errors.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <?php if (count($errors) > 0): ?>*/
/*     <ul>*/
/*         <?php foreach ($errors as $error): ?>*/
/*             <li><?php echo $error->getMessage() ?></li>*/
/*         <?php endforeach; ?>*/
/*     </ul>*/
/* <?php endif ?>*/
/* */
